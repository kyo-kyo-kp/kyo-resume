import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import TagList from '../ui/TagList';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

/** % 바 대신 3단. 갭은 '학습 중' 으로 드러낸다. */
const StackSection: React.FC = () => {
  const { stack } = useContent();
  const s = useStrings();
  const cols: { key: 'operates' | 'uses' | 'learning'; label: string; color: 'primary' | 'default' | 'secondary' }[] = [
    { key: 'operates', label: s.stack.operates, color: 'primary' },
    { key: 'uses', label: s.stack.uses, color: 'default' },
    { key: 'learning', label: s.stack.learning, color: 'secondary' }
  ];
  return (
    <SectionShell id="stack" eyebrow={s.stack.eyebrow} title={s.stack.title} tone="paper">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '160px repeat(3, 1fr)' }, gap: 2, alignItems: 'stretch' }}>
        <Box sx={{ display: { xs: 'none', md: 'contents' } }}>
          <Box />
          {cols.map((c) => (
            <Typography key={c.key} variant="overline" color={c.color === 'default' ? 'text.secondary' : `${c.color}.main`} component="div" sx={{ px: 1 }}>
              {c.label}
            </Typography>
          ))}
        </Box>
        {stack.map((g, i) => (
          <React.Fragment key={g.domain}>
            <Reveal delay={Math.min(i * 0.03, 0.2)}>
              <Typography variant="h6" component="h3" sx={{ pt: { md: 1.5 } }}>
                {g.domain}
              </Typography>
            </Reveal>
            {cols.map((c) => (
              <Reveal key={c.key} delay={Math.min(i * 0.03, 0.2)}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="overline" color="text.secondary" component="div" sx={{ display: { md: 'none' } }}>
                    {c.label}
                  </Typography>
                  {g[c.key].length ? <TagList items={g[c.key]} color={c.color} /> : <Typography variant="body2" color="text.disabled">{s.stack.none}</Typography>}
                </Paper>
              </Reveal>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </SectionShell>
  );
};

export default StackSection;
