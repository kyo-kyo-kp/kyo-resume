import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import CaseCard from '../ui/CaseCard';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';
import { ChapterId } from '../../types/content';

const ORDER: ChapterId[] = ['data', 'platform', 'backend'];

/** 케이스를 막(chapter) 단위로 묶어 최근 → 과거 순으로 보여준다. */
const Stories: React.FC = () => {
  const { cases } = useContent();
  const s = useStrings();
  const groups = ORDER.map((id) => ({ id, items: cases.filter((c) => c.chapter === id) })).filter((g) => g.items.length > 0);
  return (
    <SectionShell id="stories" eyebrow={s.stories.eyebrow} title={s.stories.title} subtitle={s.stories.subtitle} tone="paper">
      {groups.map((g, gi) => (
        <Box key={g.id} sx={{ mt: gi === 0 ? 0 : 6 }}>
          <Reveal>
            <Typography variant="overline" color="text.secondary" component="h3" sx={{ display: 'block', mb: 2 }}>
              {s.stories.groups[g.id]}
            </Typography>
          </Reveal>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
            {g.items.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i * 0.05, 0.3)}>
                <CaseCard item={c} />
              </Reveal>
            ))}
          </Box>
        </Box>
      ))}
    </SectionShell>
  );
};

export default Stories;
