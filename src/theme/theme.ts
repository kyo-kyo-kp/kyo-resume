import { createTheme, PaletteMode, Theme } from '@mui/material/styles';

/** 절제된 시니어 톤. 차콜/딥 네이비 배경 + 악센트 1색(틸). 다크 기본. */
export const buildTheme = (mode: PaletteMode): Theme => {
  const dark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#2dd4bf' : '#0f766e', contrastText: dark ? '#04201c' : '#ffffff' },
      secondary: { main: dark ? '#fbbf24' : '#b45309' },
      background: dark ? { default: '#0b1220', paper: '#111a2b' } : { default: '#f6f7f9', paper: '#ffffff' },
      text: dark ? { primary: '#e6edf3', secondary: '#9fb0c3' } : { primary: '#0f172a', secondary: '#475569' },
      divider: dark ? 'rgba(148,163,184,0.16)' : 'rgba(15,23,42,0.10)'
    },
    typography: {
      fontFamily:
        '"Pretendard Variable", Pretendard, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 },
      h3: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
      h4: { fontWeight: 700, letterSpacing: '-0.01em' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { lineHeight: 1.7 },
      body1: { lineHeight: 1.8, fontSize: '1.0rem' },
      body2: { lineHeight: 1.7 },
      overline: { letterSpacing: '0.14em', fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 600 }
    },
    shape: { borderRadius: 10 },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          '::selection': { backgroundColor: dark ? 'rgba(45,212,191,0.35)' : 'rgba(15,118,110,0.25)' }
        }
      }
    }
  });
};
