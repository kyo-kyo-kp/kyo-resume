import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useContent, useStrings } from '../../i18n/LocaleContext';

const Footer: React.FC = () => {
  const { profile } = useContent();
  const s = useStrings();
  return (
    <Box component="footer" className="pdf-hide-in-print" sx={{ py: 4, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} {profile.nameEn} · {s.footer.builtWith}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
