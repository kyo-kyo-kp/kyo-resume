import React, { useEffect, useId, useState } from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * mermaid 를 동적 import 로 렌더한다(초기 번들에서 제외).
 * 테스트 환경에서는 렌더하지 않는다.
 */
const MermaidDiagram: React.FC<{ code: string; ariaLabel?: string }> = ({ code, ariaLabel }) => {
  const theme = useTheme();
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState<string>('');
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
            fontSize: '14px'
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

  return (
    <Box
      role="img"
      aria-label={ariaLabel}
      sx={{ overflowX: 'auto', '& svg': { maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' } }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
