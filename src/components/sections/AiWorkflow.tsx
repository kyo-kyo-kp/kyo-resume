import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { ReportProblemOutlined } from '@mui/icons-material';
import SectionShell from '../layout/SectionShell';
import MermaidDiagram from '../ui/MermaidDiagram';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const AiWorkflow: React.FC = () => {
  const { aiWorkflow } = useContent();
  const s = useStrings();
  return (
    <SectionShell id="ai" eyebrow={s.ai.eyebrow} title={aiWorkflow.headline} tone="paper">
      <Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: { xs: 3, md: 5 }, mb: 6 }}>
          <Box>
            <Typography variant="overline" color="primary" component="div">
              {s.ai.changed}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: { md: '1.15rem' } }}>
              {aiWorkflow.changed}
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline" color="text.secondary" component="div">
              {s.ai.how}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {aiWorkflow.how}
            </Typography>
          </Box>
        </Box>
      </Reveal>
      <Reveal>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {s.ai.guardrails}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 760 }}>
          {aiWorkflow.summary}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {aiWorkflow.guardrails.map((g, i) => (
            <Paper key={g.title} variant="outlined" sx={{ p: 2.5, height: '100%' }}>
              <Typography variant="overline" color="primary" component="div">
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
                {g.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {g.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Reveal>

      <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 3, alignItems: 'start' }}>
        <Reveal>
          <Paper variant="outlined" sx={{ p: 2.5, borderColor: 'secondary.main', borderLeftWidth: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {s.ai.limitations}
            </Typography>
            <List dense disablePadding>
              {aiWorkflow.limitations.map((l) => (
                <ListItem key={l} disableGutters alignItems="flex-start">
                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                    <ReportProblemOutlined fontSize="small" color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={l} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Reveal>
        <Reveal delay={0.1}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="overline" color="text.secondary" component="div" sx={{ mb: 1 }}>
              {s.ai.diagram}
            </Typography>
            <MermaidDiagram code={aiWorkflow.diagram} ariaLabel={s.ai.diagram} />
          </Paper>
        </Reveal>
      </Box>
    </SectionShell>
  );
};

export default AiWorkflow;
