import React from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const HowIWork: React.FC = () => {
  const { principles } = useContent();
  const s = useStrings();
  return (
    <SectionShell id="how" eyebrow={s.how.eyebrow} title={s.how.title}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={Math.min(i * 0.04, 0.25)}>
            <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
              <Typography variant="h6" component="h3">
                {p.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {p.description}
              </Typography>
              {p.caseId && (
                <Link href={`#case-${p.caseId}`} underline="hover" variant="caption" sx={{ display: 'inline-block', mt: 1.5, fontWeight: 700 }}>
                  → {s.how.seeCase} {p.caseId}
                </Link>
              )}
            </Paper>
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
};

export default HowIWork;
