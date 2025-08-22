import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import { personalInfo, experiences } from './data/resumeData';
import { getSessionColor } from './utils/colorPalette';

// 섹션 정의
const sections = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
];

function App() {
  // 세션에서 컬러 가져오기 (새로고침 시에도 유지)
  const selectedColor = getSessionColor();

  // Material-UI 테마 설정 (동적 생성)
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: selectedColor.primary,
        light: selectedColor.secondary,
        dark: selectedColor.secondary,
      },
      secondary: {
        main: selectedColor.secondary,
        light: selectedColor.primary,
        dark: selectedColor.secondary,
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  }), [selectedColor]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <Header sections={sections} onSectionClick={handleSectionClick} />
        
        <Box id="home">
          <HeroSection personalInfo={personalInfo} />
        </Box>
        
        <AboutSection personalInfo={personalInfo} />
        
        <ExperienceSection experiences={experiences} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
