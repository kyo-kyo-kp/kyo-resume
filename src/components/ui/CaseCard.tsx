import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { Case } from '../../types/content';
import { useStrings } from '../../i18n/LocaleContext';
import Labeled from './Labeled';
import TagList from './TagList';

/** 케이스 카드. 제목에 숫자 없음, 숫자는 evidence(각주)에만. */
const CaseCard: React.FC<{ item: Case }> = ({ item }) => {
  const s = useStrings();
  return (
    <Paper id={`case-${item.id}`} variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, height: '100%', display: 'flex', flexDirection: 'column', scrollMarginTop: 88 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
        <Chip label={item.id} size="small" color="primary" sx={{ fontWeight: 800, minWidth: 32 }} />
        <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.4 }}>
          {item.competency}
        </Typography>
      </Stack>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        {item.title}
      </Typography>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Labeled label={s.stories.problem}>{item.problem}</Labeled>
        <Labeled label={s.stories.approach}>{item.approach}</Labeled>
        <Labeled label={s.stories.change} accent>
          {item.change}
        </Labeled>
      </Stack>
      <Box sx={{ mt: 3 }}>
        {item.stack.length > 0 && <TagList items={item.stack} />}
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1.5 }}>
          {item.period}
          {item.evidence ? ` · ${s.stories.evidence}: ${item.evidence}` : ''}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CaseCard;
