import React, { useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import PDFDownloadButton from './components/PDFDownloadButton';
import { personalInfo, experiences } from './data/resumeData';

// Material-UI 테마 설정
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8fa4ef',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#764ba2',
      light: '#9a6bb8',
      dark: '#5a3a7a',
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
});

// 섹션 정의
const sections = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
];

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box ref={resumeRef} sx={{ minHeight: '100vh' }}>
        <PDFDownloadButton targetRef={resumeRef} />
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
