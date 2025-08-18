import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface HeaderProps {
  sections: { id: string; title: string }[];
  onSectionClick: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ sections, onSectionClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {sections.map((section) => (
          <ListItem
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            boxShadow: scrolled ? 1 : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: scrolled ? theme.palette.primary.main : 'white',
                fontWeight: 'bold',
              }}
            >
              김규호
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: scrolled ? theme.palette.primary.main : 'white' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    color="inherit"
                    onClick={() => handleSectionClick(section.id)}
                    sx={{
                      color: scrolled ? theme.palette.primary.main : 'white',
                      '&:hover': {
                        backgroundColor: scrolled 
                          ? theme.palette.primary.light 
                          : 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {section.title}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </motion.div>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
