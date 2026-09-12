import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Reveal from '../ui/Reveal';

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: 'default' | 'paper';
}

const SectionShell: React.FC<SectionShellProps> = ({ id, eyebrow, title, subtitle, children, tone = 'default' }) => (
  <Box
    component="section"
    id={id}
    sx={{
      py: { xs: 8, md: 12 },
      bgcolor: tone === 'paper' ? 'background.paper' : 'background.default',
      borderTop: 1,
      borderColor: 'divider',
      scrollMarginTop: 72
    }}
  >
    <Container maxWidth="lg">
      <Reveal>
        <Typography variant="overline" color="primary" component="div">
          {eyebrow}
        </Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 0.5, mb: subtitle ? 1 : 4, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
            {subtitle}
          </Typography>
        )}
      </Reveal>
      {children}
    </Container>
  </Box>
);

export default SectionShell;
