import React from 'react';
import { Chip, Stack } from '@mui/material';

const TagList: React.FC<{ items: string[]; color?: 'default' | 'primary' | 'secondary'; size?: 'small' | 'medium' }> = ({
  items,
  color = 'default',
  size = 'small'
}) => (
  <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
    {items.map((t) => (
      <Chip key={t} label={t} size={size} color={color} variant="outlined" />
    ))}
  </Stack>
);

export default TagList;
