import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import SectionShell from '../layout/SectionShell';
import TagList from '../ui/TagList';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';
import { experiences } from '../../data/resumeData';

const careerSpan = (startIso: string, now = new Date()): { years: number; months: number } => {
  const start = new Date(startIso);
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return { years: Math.floor(months / 12), months: months % 12 };
};

/** 3막 타임라인. 회사별 상세는 기존 resumeData 를 아코디언으로 재사용한다. */
const Journey: React.FC = () => {
  const { chapters, profile } = useContent();
  const s = useStrings();
  const span = careerSpan(profile.careerStart);

  return (
    <SectionShell id="journey" eyebrow={s.journey.eyebrow} title={s.journey.title} subtitle={s.journey.careerTotal(span.years, span.months)}>
      <Stack spacing={3}>
        {[...chapters].reverse().map((ch, idx) => {
          const items = experiences.filter((e) => (e.chapter ? e.chapter === ch.id : ch.companies.includes(e.company)));
          const label = (company: string) => ch.companyLabels?.[ch.companies.indexOf(company)] ?? company;
          return (
            <Reveal key={ch.id} delay={Math.min(idx * 0.05, 0.2)}>
              <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' }, gap: { xs: 2, md: 4 } }}>
                  <Box>
                    <Typography variant="overline" color="primary" component="div">
                      {ch.period}
                    </Typography>
                    <Typography variant="h5" component="h3">
                      {ch.title}
                    </Typography>
                    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', mt: 1.5 }}>
                      {ch.roles.map((r) => (
                        <Chip key={r} label={r} size="small" />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="body1">{ch.summary}</Typography>
                    <Typography variant="overline" color="text.secondary" component="div" sx={{ mt: 2 }}>
                      {s.journey.lesson}
                    </Typography>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                      {ch.lesson}
                    </Typography>
                  </Box>
                </Box>
                {items.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="overline" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
                      {s.journey.details}
                    </Typography>
                    {items.map((e) => (
                      <Accordion key={e.id} disableGutters elevation={0} sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderTop: 1, borderColor: 'divider' }}>
                        <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 2 }} sx={{ width: '100%', alignItems: { sm: 'baseline' } }}>
                            <Typography sx={{ fontWeight: 700 }}>{label(e.company)}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {e.position} · {e.period}
                            </Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0, pb: 2.5 }}>
                          <Typography variant="body2" sx={{ mb: 1.5 }}>
                            {e.description}
                          </Typography>
                          {e.achievements && (
                            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                              {e.achievements.map((a) => (
                                <Typography key={a} component="li" variant="body2" sx={{ mb: 0.5 }}>
                                  {a}
                                </Typography>
                              ))}
                            </Box>
                          )}
                          <Box sx={{ mt: 1.5 }}>
                            <TagList items={e.technologies} />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                )}
              </Paper>
            </Reveal>
          );
        })}
      </Stack>
    </SectionShell>
  );
};

export default Journey;
