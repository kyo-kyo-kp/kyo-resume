import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItemButton, ListItemText, Stack, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { useColorMode } from '../../theme/ColorModeContext';
import { useLocale, useStrings, useContent } from '../../i18n/LocaleContext';
import { SectionId } from '../../i18n/strings';
import PDFDownloadButton from '../PDFDownloadButton';

const NAV: SectionId[] = ['journey', 'platform', 'stories', 'stack', 'ai', 'how', 'leadership', 'contact'];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggle: toggleMode } = useColorMode();
  const { locale, toggle: toggleLocale } = useLocale();
  const s = useStrings();
  const { profile } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="pdf-hide-in-print"
      sx={{
        bgcolor: scrolled ? (mode === 'dark' ? 'rgba(11,18,32,0.82)' : 'rgba(246,247,249,0.85)') : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? 1 : 0,
        borderColor: 'divider',
        color: 'text.primary',
        transition: 'background-color .25s ease'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 1 }}>
          <Button onClick={() => go('home')} sx={{ color: 'text.primary', fontWeight: 800, px: 0.5 }}>
            <Typography component="span" sx={{ fontWeight: 800 }}>
              {locale === 'ko' ? profile.name : profile.nameEn}
            </Typography>
          </Button>
          <Box sx={{ flex: 1 }} />
          {!isMobile && (
            <Stack direction="row" spacing={0.5} sx={{ mr: 1 }}>
              {NAV.map((id) => (
                <Button key={id} size="small" onClick={() => go(id)} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                  {s.nav[id]}
                </Button>
              ))}
            </Stack>
          )}
          <Tooltip title={s.toggles.locale}>
            <Button size="small" variant="outlined" onClick={toggleLocale} sx={{ minWidth: 44, px: 1, borderColor: 'divider', color: 'text.primary' }}>
              {locale === 'ko' ? 'EN' : 'KO'}
            </Button>
          </Tooltip>
          <Tooltip title={s.toggles.theme}>
            <IconButton size="small" onClick={toggleMode} aria-label={s.toggles.theme} sx={{ color: 'text.primary' }}>
              {mode === 'dark' ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
            </IconButton>
          </Tooltip>
          {!isMobile && <PDFDownloadButton label={s.pdf.label} busyLabel={s.pdf.busy} />}
          {isMobile && (
            <IconButton edge="end" onClick={() => setOpen(true)} aria-label="menu" sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }} role="presentation">
          <List>
            {NAV.map((id) => (
              <ListItemButton key={id} onClick={() => go(id)}>
                <ListItemText primary={s.nav[id]} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ px: 2, pt: 1 }}>
            <PDFDownloadButton label={s.pdf.label} busyLabel={s.pdf.busy} />
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
