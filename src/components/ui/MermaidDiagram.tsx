import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { AppBar, Box, Button, Chip, Dialog, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Close, ZoomIn, ZoomOut, ZoomOutMap } from '@mui/icons-material';
import { useStrings } from '../../i18n/LocaleContext';

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;

/**
 * mermaid 를 동적 import 로 렌더한다(초기 번들에서 제외).
 * 인라인에서는 컨테이너 폭에 맞춰 축소해 보여주고, 클릭하면 전체 화면 모달에서 확대·축소해 볼 수 있다.
 * 테스트 환경에서는 렌더하지 않는다.
 */
const MermaidDiagram: React.FC<{ code: string; ariaLabel?: string }> = ({ code, ariaLabel }) => {
  const theme = useTheme();
  const s = useStrings();
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const dark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: theme.typography.fontFamily,
          themeVariables: {
            primaryColor: dark ? '#16213a' : '#e6f4f2',
            primaryTextColor: theme.palette.text.primary,
            primaryBorderColor: theme.palette.primary.main,
            lineColor: dark ? '#9fb0c3' : '#475569',
            secondaryColor: dark ? '#1b2a44' : '#f1f5f9',
            tertiaryColor: dark ? '#0f1a2e' : '#f8fafc',
            clusterBkg: dark ? 'rgba(45,212,191,0.06)' : 'rgba(15,118,110,0.05)',
            clusterBorder: dark ? 'rgba(148,163,184,0.35)' : 'rgba(15,23,42,0.18)',
            edgeLabelBackground: theme.palette.background.paper,
            fontSize: '15px'
          }
        });
        const { svg: out } = await mermaid.render(`mmd-${reactId}`, code);
        if (!cancelled) setSvg(out);
      } catch (err) {
        // 다이어그램 실패는 페이지를 깨지 않는다.
        console.error('mermaid render failed', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, dark, reactId, theme]);

  // 모달용 복제본: 같은 id 가 문서에 두 번 있지 않도록 접미사를 붙인다(marker 참조 포함).
  const largeSvg = useMemo(() => svg.replace(new RegExp(`mmd-${reactId}`, 'g'), `mmd-${reactId}-lg`), [svg, reactId]);

  const openDialog = useCallback(() => {
    if (!svg) return;
    setScale(1);
    setOpen(true);
  }, [svg]);
  const closeDialog = useCallback(() => setOpen(false), []);
  const zoom = (delta: number) => setScale((v) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((v + delta) * 100) / 100)));

  return (
    <>
      <Box
        role={svg ? 'button' : 'img'}
        tabIndex={svg ? 0 : -1}
        aria-label={svg ? `${ariaLabel ?? ''} · ${s.common.enlarge}` : ariaLabel}
        onClick={openDialog}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDialog();
          }
        }}
        sx={{
          position: 'relative',
          cursor: svg ? 'zoom-in' : 'default',
          overflowX: 'auto',
          borderRadius: 1,
          outline: 'none',
          '&:focus-visible': { boxShadow: (t) => `0 0 0 2px ${t.palette.primary.main}` },
          '& svg': { maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' },
          '&:hover .enlarge-hint': { opacity: 1 }
        }}
      >
        <Box dangerouslySetInnerHTML={{ __html: svg }} />
        {svg && (
          <Chip
            className="enlarge-hint pdf-hide-in-print"
            size="small"
            icon={<ZoomOutMap fontSize="small" />}
            label={s.common.enlarge}
            sx={{ position: 'absolute', top: 4, right: 4, opacity: { xs: 1, md: 0.75 }, transition: 'opacity .2s', pointerEvents: 'none', bgcolor: 'background.paper' }}
          />
        )}
      </Box>

      <Dialog fullScreen open={open} onClose={closeDialog} className="pdf-hide-in-print" aria-label={ariaLabel}>
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Toolbar sx={{ gap: 1 }}>
            <Typography sx={{ flex: 1, fontWeight: 700 }} noWrap>
              {ariaLabel}
            </Typography>
            <IconButton onClick={() => zoom(-ZOOM_STEP)} aria-label={s.common.zoomOut} disabled={scale <= ZOOM_MIN}>
              <ZoomOut />
            </IconButton>
            <Typography variant="body2" sx={{ minWidth: 48, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
              {Math.round(scale * 100)}%
            </Typography>
            <IconButton onClick={() => zoom(ZOOM_STEP)} aria-label={s.common.zoomIn} disabled={scale >= ZOOM_MAX}>
              <ZoomIn />
            </IconButton>
            <Button size="small" onClick={() => setScale(1)} sx={{ color: 'text.secondary' }}>
              {s.common.resetZoom}
            </Button>
            <IconButton edge="end" onClick={closeDialog} aria-label={s.common.close}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 2, md: 4 },
            bgcolor: 'background.default',
            '& svg': { width: `${scale * 100}% !important`, maxWidth: 'none !important', height: 'auto !important', display: 'block', margin: '0 auto' }
          }}
          dangerouslySetInnerHTML={{ __html: largeSvg }}
        />
      </Dialog>
    </>
  );
};

export default MermaidDiagram;
