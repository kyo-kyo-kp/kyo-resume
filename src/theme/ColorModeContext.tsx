import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { buildTheme } from './theme';

interface ColorModeValue {
  mode: PaletteMode;
  toggle: () => void;
  /** 인쇄 중이면 true. 인쇄 중에는 테마가 라이트로 강제된다. */
  printing: boolean;
  /** 인쇄를 시작하기 전에 호출해 라이트 테마로 전환한다. afterprint 에서 자동 복귀. */
  beginPrint: () => void;
}

const STORAGE_KEY = 'color-mode';
const PRINT_TITLE = 'Kyuho-Kim-Kyo-Resume';
const ColorModeContext = createContext<ColorModeValue>({ mode: 'dark', toggle: () => undefined, printing: false, beginPrint: () => undefined });

const readStored = (): PaletteMode | null => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

/** 다크 기본. 시스템 설정을 따르되, 사용자가 토글하면 localStorage 에 기억한다. */
export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');
  const [mode, setMode] = useState<PaletteMode>(() => readStored() ?? 'dark');
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (readStored() === null) setMode(prefersLight ? 'light' : 'dark');
  }, [prefersLight]);

  // Cmd/Ctrl+P 로 직접 인쇄해도 라이트로 전환되도록 브라우저 이벤트를 듣는다.
  useEffect(() => {
    const originalTitle = document.title;
    const before = () => {
      setPrinting(true);
      document.title = PRINT_TITLE;
    };
    const after = () => {
      setPrinting(false);
      document.title = originalTitle;
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next: PaletteMode = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable: ignore */
      }
      return next;
    });
  }, []);

  const beginPrint = useCallback(() => {
    setPrinting(true);
    document.title = PRINT_TITLE;
  }, []);

  const effectiveMode: PaletteMode = printing ? 'light' : mode;
  const theme = useMemo(() => buildTheme(effectiveMode), [effectiveMode]);
  const value = useMemo(() => ({ mode: effectiveMode, toggle, printing, beginPrint }), [effectiveMode, toggle, printing, beginPrint]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = (): ColorModeValue => useContext(ColorModeContext);
