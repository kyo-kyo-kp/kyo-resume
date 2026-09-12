import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, SiteContent } from '../types/content';
import { content, DEFAULT_LOCALE } from '../content';
import { strings, UiStrings } from './strings';

interface LocaleValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'locale';
const LocaleContext = createContext<LocaleValue>({ locale: DEFAULT_LOCALE, setLocale: () => undefined, toggle: () => undefined });

const readStored = (): Locale | null => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'ko' || v === 'en' ? v : null;
  } catch {
    return null;
  }
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => readStored() ?? DEFAULT_LOCALE);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setLocale(locale === 'ko' ? 'en' : 'ko'), [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, toggle }), [locale, setLocale, toggle]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleValue => useContext(LocaleContext);
export const useContent = (): SiteContent => content[useContext(LocaleContext).locale];
export const useStrings = (): UiStrings => strings[useContext(LocaleContext).locale];
