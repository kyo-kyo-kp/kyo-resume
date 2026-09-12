import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { MailOutline, GitHub, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useContent, useLocale, useStrings } from '../../i18n/LocaleContext';

const iconFor = (label: string) => (label.toLowerCase().includes('github') ? <GitHub /> : label.toLowerCase().includes('linkedin') ? <LinkedIn /> : undefined);

/** 첫 화면. 포지셔닝 한 문장 + 내가 푸는 문제 3줄 + CTA. 숫자 없음. */
const Hero: React.FC = () => {
  const { profile } = useContent();
  const { locale } = useLocale();
  const s = useStrings();

  return (
    <Box
      component="section"
      id="home"
      sx={{
        pt: { xs: 8, md: 14 },
        pb: { xs: 8, md: 12 },
        background: (t) =>
          t.palette.mode === 'dark'
            ? 'radial-gradient(1200px 600px at 10% -10%, rgba(45,212,191,0.12), transparent 60%)'
            : 'radial-gradient(1200px 600px at 10% -10%, rgba(15,118,110,0.10), transparent 60%)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: { xs: 5, md: 8 }, alignItems: 'start' }}>
          <motion.div className="reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <Typography variant="overline" color="primary" component="div">
              {profile.title}
            </Typography>
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.6rem' }, mt: 1 }}>
              {locale === 'ko' ? profile.name : profile.nameEn}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5 }}>
              {locale === 'ko' ? profile.nameEn : profile.name} · {profile.location}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 3, maxWidth: 680, fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
              {profile.tagline}
            </Typography>
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 4 }}>
              <Button variant="contained" startIcon={<MailOutline />} href={`mailto:${profile.email}`}>
                {s.hero.email}
              </Button>
              {profile.links.map((l) => (
                <Button key={l.label} variant="outlined" startIcon={iconFor(l.label)} href={l.url} target="_blank" rel="noreferrer" sx={{ borderColor: 'divider', color: 'text.primary' }}>
                  {l.label}
                </Button>
              ))}
            </Stack>
          </motion.div>

          <motion.div className="reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}>
            <Box sx={{ borderLeft: 2, borderColor: 'primary.main', pl: 3, pt: { md: 6 } }}>
              <Typography variant="overline" color="text.secondary" component="div">
                {s.hero.problemsLabel}
              </Typography>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {profile.problems.map((p, i) => (
                  <Typography key={i} variant="body1" sx={{ fontSize: { md: '1.05rem' } }}>
                    {p}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
