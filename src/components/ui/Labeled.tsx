import React from 'react';
import { Box, Typography } from '@mui/material';

/** 소제목(overline) + 본문. 문제/접근/바뀐 것 같은 라벨 문단에 쓴다. */
const Labeled: React.FC<{ label: string; children: React.ReactNode; accent?: boolean }> = ({ label, children, accent = false }) => (
  <Box>
    <Typography variant="overline" color={accent ? 'primary' : 'text.secondary'} component="div" sx={{ lineHeight: 1.6 }}>
      {label}
    </Typography>
    <Typography variant="body1" color="text.primary" component="div">
      {children}
    </Typography>
  </Box>
);

export default Labeled;
