import React from 'react';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SectionShell from '../layout/SectionShell';
import Labeled from '../ui/Labeled';
import TagList from '../ui/TagList';
import MermaidDiagram from '../ui/MermaidDiagram';
import Reveal from '../ui/Reveal';
import { useContent, useStrings } from '../../i18n/LocaleContext';

/** 앵커. as-is → to-be 다이어그램이 중앙에 온다. */
const Platform: React.FC = () => {
  const { platform } = useContent();
  const s = useStrings();

  return (
    <SectionShell id="platform" eyebrow={s.platform.eyebrow} title={s.platform.title} subtitle={platform.headline}>
      <Reveal>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {platform.scaleContext}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Labeled label={s.platform.problem}>{platform.problem}</Labeled>
          <Labeled label={s.platform.approach}>{platform.approach}</Labeled>
          <Labeled label={s.platform.change}>{platform.change}</Labeled>
          <Labeled label={s.platform.differently} accent>
            {platform.differently}
          </Labeled>
        </Box>
      </Reveal>

      <Reveal>
        <Paper variant="outlined" sx={{ mt: 6, p: { xs: 2, md: 3 } }}>
          <Typography variant="overline" color="text.secondary" component="div" sx={{ mb: 1 }}>
            {s.platform.diagram}
          </Typography>
          <MermaidDiagram code={platform.diagram} ariaLabel={s.platform.diagram} />
        </Paper>
      </Reveal>

      <Reveal>
        <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {platform.designCriteria.map((c, i) => (
            <Paper key={c.title} variant="outlined" sx={{ p: 2.5 }}>
              <Typography variant="overline" color="primary" component="div">
                {s.platform.criteria} {i + 1}
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5 }}>
                {c.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {c.description}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Paper variant="outlined" sx={{ mt: 2, p: 2.5, borderColor: 'primary.main', borderLeftWidth: 4 }}>
          <Typography variant="overline" color="primary" component="div">
            {s.platform.scope}
          </Typography>
          <Typography variant="body1">{platform.scopeNote}</Typography>
        </Paper>
      </Reveal>

      <Reveal>
        <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
          {s.platform.stages}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '16%' }}>{s.platform.stage}</TableCell>
                <TableCell sx={{ width: '26%' }}>{s.platform.problem}</TableCell>
                <TableCell>{s.platform.didWhat}</TableCell>
                <TableCell sx={{ width: '20%' }}>{s.platform.stack}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {platform.stages.map((st) => (
                <TableRow key={st.stage} sx={{ verticalAlign: 'top' }}>
                  <TableCell sx={{ fontWeight: 700 }}>{st.stage}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{st.problem}</TableCell>
                  <TableCell>{st.didWhat}</TableCell>
                  <TableCell>
                    <TagList items={st.stack} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {platform.myPart && (
          <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
            <Typography variant="overline" color="primary" component="div">
              {s.platform.myPart}
            </Typography>
            <Typography variant="body2">{platform.myPart}</Typography>
          </Paper>
        )}
        {platform.evidence && (
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              {s.platform.evidence}: {platform.evidence}
            </Typography>
          </Stack>
        )}
      </Reveal>
    </SectionShell>
  );
};

export default Platform;
