import React from 'react';
import { Box } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import CaseCard from '../ui/CaseCard';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const Stories: React.FC = () => {
  const { cases } = useContent();
  const s = useStrings();
  return (
    <SectionShell id="stories" eyebrow={s.stories.eyebrow} title={s.stories.title} subtitle={s.stories.subtitle} tone="paper">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
        {cases.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i * 0.05, 0.3)}>
            <CaseCard item={c} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
};

export default Stories;
