import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Container,
  Paper,
  IconButton
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Palette
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../types';
import { getCareerPeriodString } from '../utils/careerCalculator';
import { getSessionColor, changeColor } from '../utils/colorPalette';
import { locationService } from '../services/LocationService';
import { weatherService } from '../services/WeatherService';
import { llmService } from '../services/LLMService';
import { LocationInfo, WeatherInfo, GreetingInfo } from '../types/weatherGreeting';
import SpeechBubble from './SpeechBubble';

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo }) => {
  // 세션에서 선택된 컬러 가져오기
  const [selectedColor, setSelectedColor] = React.useState(getSessionColor());
  
  // WeatherGreeting 상태
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [greetingInfo, setGreetingInfo] = useState<GreetingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // 컬러 변경 함수
  const handleColorChange = () => {
    const newColor = changeColor();
    setSelectedColor(newColor);
    // 말풍선 색상도 함께 업데이트하기 위해 인사말 재생성
    if (locationInfo && weatherInfo) {
      handleRefreshGreeting();
    }
    // 실시간 색상 변경을 위해 페이지 새로고침 제거
    // window.location.reload();
  };

  // WeatherGreeting 로드 함수
  const loadWeatherGreeting = async () => {
    setIsLoading(true);
    
    try {
      // 1. 지역 정보 조회
      const locationResult = await locationService.getLocationInfo();
      if (locationResult.success && locationResult.data) {
        setLocationInfo(locationResult.data);
        
        // 2. 날씨 정보 조회
        const weatherResult = await weatherService.getWeatherInfo(locationResult.data);
        if (weatherResult.success && weatherResult.data) {
          setWeatherInfo(weatherResult.data);
          
          // 3. 인사말 생성
          const greetingResult = await llmService.generateGreeting(locationResult.data, weatherResult.data);
          if (greetingResult.success && greetingResult.data) {
            setGreetingInfo(greetingResult.data);
          }
        } else {
          // 날씨 정보 실패 시 기본 날씨로 인사말 생성
          const defaultWeather: WeatherInfo = {
            temperature: 20,
            condition: '맑음',
            description: '기본 날씨 정보',
            humidity: 50,
            windSpeed: 2
          };
          setWeatherInfo(defaultWeather);
          
          const greetingResult = await llmService.generateGreeting(locationResult.data, defaultWeather);
          if (greetingResult.success && greetingResult.data) {
            setGreetingInfo(greetingResult.data);
          }
        }
      }
    } catch (error) {
      console.error('WeatherGreeting 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 인사말 새로고침 함수
  const handleRefreshGreeting = async () => {
    if (locationInfo && weatherInfo) {
      const greetingResult = await llmService.generateGreeting(locationInfo, weatherInfo);
      if (greetingResult.success && greetingResult.data) {
        setGreetingInfo(greetingResult.data);
      }
    }
  };

  // 캐시 삭제 함수
  const handleClearCache = () => {
    if (locationInfo && weatherInfo) {
      llmService.clearCache(locationInfo, weatherInfo);
      // 캐시 삭제 후 새로운 인사말 생성
      handleRefreshGreeting();
    }
  };

  // 컴포넌트 마운트 시 WeatherGreeting 로드
  useEffect(() => {
    loadWeatherGreeting();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: selectedColor.gradient,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 배경 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)
          `,
          zIndex: 1
        }}
      />
      
      {/* 추가 배경 요소들 */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            zIndex: 1
          }}
        />
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            zIndex: 1
          }}
        />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            {/* 왼쪽 컨텐츠 */}
            <Box sx={{ flex: { md: 7 } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.2
                  }}
                >
                  안녕하세요,<br />
                  {personalInfo.name}입니다
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 300
                  }}
                >
                  {personalInfo.title}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    maxWidth: 600,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {personalInfo.summary}
                </Typography>
              </motion.div>




            </Box>

            {/* 오른쪽 프로필 카드 */}
            <Box sx={{ flex: { md: 5 }, position: 'relative' }}>
              {/* 컬러 변경 버튼 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <IconButton
                  onClick={handleColorChange}
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                    zIndex: 10
                  }}
                >
                  <Palette sx={{ color: selectedColor.primary }} />
                </IconButton>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      src="/kyo-profile.png"
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        fontSize: '3rem',
                        backgroundColor: 'primary.main'
                      }}
                    >
                      {personalInfo.name.charAt(0)}
                    </Avatar>
                  </Box>
                  
                  {/* 말풍선 - 프로필 카드 위쪽에 위치 */}
                  {greetingInfo && (
                    <SpeechBubble
                      key={`speech-bubble-${selectedColor.name}`}
                      greetingInfo={greetingInfo}
                      onRefresh={handleRefreshGreeting}
                      onClearCache={handleClearCache}
                      position="top-right"
                      size="small"
                      showControls={true}
                      currentColor={selectedColor}
                    />
                  )}

                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {personalInfo.name}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                    {personalInfo.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3, 
                      color: 'white',
                      fontWeight: 'bold',
                      background: selectedColor.gradient,
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'inline-block',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    총 경력 {getCareerPeriodString('2011-12-01')}
                  </Typography>

                  <Box sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body2">{personalInfo.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body2">{personalInfo.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body2">{personalInfo.location}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
        

      </Container>
    </Box>
  );
};

export default HeroSection;
