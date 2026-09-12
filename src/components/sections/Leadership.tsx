import React from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import Labeled from '../ui/Labeled';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const Leadership: React.FC = () => {
  const { leadership } = useContent();
  const s = useStrings();
  return (
    <SectionShell id="leadership" eyebrow={s.leadership.eyebrow} title={s.leadership.title}>
      <Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          <Labeled label={s.leadership.situation}>{leadership.situation}</Labeled>
          <Labeled label={s.leadership.principle}>{leadership.principle}</Labeled>
          <Labeled label={s.leadership.result} accent>
            {leadership.result}
          </Labeled>
        </Box>
        {leadership.teamDecision && (
          <Paper variant="outlined" sx={{ mt: 4, p: 2.5, borderColor: 'primary.main', borderLeftWidth: 4 }}>
            <Typography variant="overline" color="primary" component="div">
              {s.leadership.teamDecision}
            </Typography>
            <Typography variant="h6">{leadership.teamDecision.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {leadership.teamDecision.description}
            </Typography>
          </Paper>
        )}
        {leadership.caseId && (
          <Link href={`#case-${leadership.caseId}`} underline="hover" variant="caption" sx={{ display: 'inline-block', mt: 3, fontWeight: 700 }}>
            → {s.leadership.seeCase} {leadership.caseId}
          </Link>
        )}
      </Reveal>
    </SectionShell>
  );
};

export default Leadership;
