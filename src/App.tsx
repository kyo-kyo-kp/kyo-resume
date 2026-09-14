import React from 'react';
import { Box } from '@mui/material';
import './App.css';
import { ColorModeProvider } from './theme/ColorModeContext';
import { LocaleProvider } from './i18n/LocaleContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Platform from './components/sections/Platform';
import Stories from './components/sections/Stories';
import HowIWork from './components/sections/HowIWork';
import AiWorkflow from './components/sections/AiWorkflow';
import Journey from './components/sections/Journey';
import StackSection from './components/sections/Stack';
import Leadership from './components/sections/Leadership';
import Contact from './components/sections/Contact';
import ResumePrint from './components/print/ResumePrint';

/** 섹션 순서 = 채용 팀장의 스캔 순서. 콘텐츠는 src/content, 문구는 src/i18n. */
const App: React.FC = () => (
  <LocaleProvider>
    <ColorModeProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Header />
        <Box component="main" className="screen-only">
          <Hero />
          <Journey />
          <Platform />
          <Stories />
          <StackSection />
          <AiWorkflow />
          <HowIWork />
          <Leadership />
          <Contact />
        </Box>
        <Footer />
        <ResumePrint />
      </Box>
    </ColorModeProvider>
  </LocaleProvider>
);

export default App;
