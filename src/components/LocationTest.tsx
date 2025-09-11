import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert, Avatar } from '@mui/material';
import { LocationOn, Refresh, Clear, WbSunny } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { locationService } from '../services/LocationService';
import { weatherService } from '../services/WeatherService';
import { llmService } from '../services/LLMService';
import { LocationInfo, WeatherInfo, GreetingInfo } from '../types/weatherGreeting';
import SpeechBubble from './SpeechBubble';

/**
 * IP 기반 지역 유추 기능 테스트 컴포넌트
 * 개발 및 디버깅 목적으로 사용됩니다.
 */
const LocationTest: React.FC = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [greetingInfo, setGreetingInfo] = useState<GreetingInfo | null>(null);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [greetingLoading, setGreetingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [greetingError, setGreetingError] = useState<string | null>(null);
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'valid' | 'invalid' | 'not_set'>('not_set');
  const [cacheStatus, setCacheStatus] = useState<{ hasCache: boolean; isExpired: boolean; timestamp?: number }>({
    hasCache: false,
    isExpired: false
  });

  // 컴포넌트 마운트 시 캐시 상태 확인
  useEffect(() => {
    const status = locationService.getCacheStatus();
    setCacheStatus(status);
    
    // API 키 상태 확인
    checkApiKeyStatus();
    
    // 캐시가 있고 유효하다면 자동으로 로드
    if (status.hasCache && !status.isExpired) {
      loadLocationInfo();
    }
  }, []);

  const checkApiKeyStatus = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      setApiKeyStatus('not_set');
      return;
    }

    setApiKeyStatus('checking');
    
    try {
      // 서울의 날씨로 API 키 유효성 테스트
      const testUrl = `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&appid=${apiKey}`;
      const response = await fetch(testUrl);
      
      if (response.ok) {
        setApiKeyStatus('valid');
      } else if (response.status === 401) {
        setApiKeyStatus('invalid');
      } else {
        setApiKeyStatus('invalid');
      }
    } catch (error) {
      setApiKeyStatus('invalid');
    }
  };

  const loadLocationInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await locationService.getLocationInfo();
      
      if (result.success && result.data) {
        setLocationInfo(result.data);
        // 캐시 상태 업데이트
        setCacheStatus(locationService.getCacheStatus());
        
        // 지역 정보가 로드되면 자동으로 날씨 정보도 로드
        loadWeatherInfo(result.data);
      } else {
        setError(result.error || '지역 정보를 가져올 수 없습니다.');
      }
    } catch (err) {
      setError('예상치 못한 오류가 발생했습니다.');
      console.error('LocationTest 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherInfo = async (location: LocationInfo) => {
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const result = await weatherService.getWeatherInfo(location);
      
      if (result.success && result.data) {
        setWeatherInfo(result.data);
        
        // 날씨 정보가 로드되면 자동으로 인사말도 생성
        loadGreetingInfo(location, result.data);
      } else {
        setWeatherError(result.error || '날씨 정보를 가져올 수 없습니다.');
        
        // 날씨 정보가 없어도 기본 날씨 정보로 인사말 생성
        const defaultWeather: WeatherInfo = {
          temperature: 20,
          condition: '맑음',
          description: '기본 날씨 정보',
          humidity: 50,
          windSpeed: 2
        };
        setWeatherInfo(defaultWeather);
        loadGreetingInfo(location, defaultWeather);
      }
    } catch (err) {
      setWeatherError('예상치 못한 오류가 발생했습니다.');
      console.error('WeatherTest 오류:', err);
      
      // 에러가 발생해도 기본 날씨 정보로 인사말 생성
      const defaultWeather: WeatherInfo = {
        temperature: 20,
        condition: '맑음',
        description: '기본 날씨 정보',
        humidity: 50,
        windSpeed: 2
      };
      setWeatherInfo(defaultWeather);
      loadGreetingInfo(location, defaultWeather);
    } finally {
      setWeatherLoading(false);
    }
  };

  const loadGreetingInfo = async (location: LocationInfo, weather: WeatherInfo) => {
    setGreetingLoading(true);
    setGreetingError(null);

    console.log('인사말 생성 시작:', { location, weather });

    try {
      const result = await llmService.generateGreeting(location, weather);
      
      console.log('인사말 생성 결과:', result);
      
      if (result.success && result.data) {
        setGreetingInfo(result.data);
        setShowSpeechBubble(true); // 인사말이 생성되면 말풍선 표시
        console.log('인사말 설정 완료:', result.data);
      } else {
        setGreetingError(result.error || '인사말을 생성할 수 없습니다.');
        console.error('인사말 생성 실패:', result.error);
      }
    } catch (err) {
      setGreetingError('예상치 못한 오류가 발생했습니다.');
      console.error('GreetingTest 오류:', err);
    } finally {
      setGreetingLoading(false);
    }
  };

  const clearCache = () => {
    locationService.clearCache();
    if (locationInfo) {
      weatherService.clearCache(locationInfo);
      if (weatherInfo) {
        llmService.clearCache(locationInfo, weatherInfo);
      }
    }
    setLocationInfo(null);
    setWeatherInfo(null);
    setGreetingInfo(null);
    setShowSpeechBubble(true);
    setCacheStatus({ hasCache: false, isExpired: false });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ko-KR');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            IP 기반 지역 유추 테스트
          </Typography>
        </Box>

        {/* 캐시 상태 표시 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            캐시 상태:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cacheStatus.hasCache ? (
              <>
                ✅ 캐시 있음 {cacheStatus.isExpired ? '(만료됨)' : '(유효함)'}
                {cacheStatus.timestamp && (
                  <><br />📅 저장 시간: {formatTimestamp(cacheStatus.timestamp)}</>
                )}
              </>
            ) : (
              '❌ 캐시 없음'
            )}
          </Typography>
        </Box>

        {/* 버튼 그룹 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <LocationOn />}
            onClick={loadLocationInfo}
            disabled={loading}
          >
            {loading ? '조회 중...' : '지역 정보 조회'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadLocationInfo}
            disabled={loading}
          >
            새로고침
          </Button>
          
          <Button
            variant="outlined"
            startIcon={greetingLoading ? <CircularProgress size={20} /> : <WbSunny />}
            onClick={() => {
              if (locationInfo) {
                const defaultWeather: WeatherInfo = {
                  temperature: 20,
                  condition: '맑음',
                  description: '기본 날씨 정보',
                  humidity: 50,
                  windSpeed: 2
                };
                loadGreetingInfo(locationInfo, defaultWeather);
              }
            }}
            disabled={greetingLoading || !locationInfo}
          >
            {greetingLoading ? '생성 중...' : '인사말만 생성'}
          </Button>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            onClick={clearCache}
            disabled={loading}
          >
            캐시 삭제
          </Button>
        </Box>

        {/* 에러 메시지 */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 날씨 에러 메시지 */}
        {weatherError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            날씨 정보: {weatherError}
          </Alert>
        )}

        {/* 인사말 에러 메시지 */}
        {greetingError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            인사말 생성: {greetingError}
          </Alert>
        )}

        {/* 지역 정보 표시 */}
        {locationInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                backgroundColor: 'primary.light',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                🌍 IP 기반 지역 정보
              </Typography>
              
              {/* 네트워크 정보 안내 */}
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>💡 참고:</strong> 기업 네트워크나 VPN을 사용하는 경우, 
                  실제 위치와 IP 기반 위치가 다를 수 있습니다. 
                </Typography>
              </Alert>
              
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    국가:
                  </Typography>
                  <Typography variant="body2">
                    {locationInfo.countryName} ({locationInfo.country})
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    도시:
                  </Typography>
                  <Typography variant="body2">
                    {locationInfo.city}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    지역:
                  </Typography>
                  <Typography variant="body2">
                    {locationInfo.region}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    시간대:
                  </Typography>
                  <Typography variant="body2">
                    {locationInfo.timezone}
                  </Typography>
                </Box>
                
                {locationInfo.latitude && locationInfo.longitude && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      좌표:
                    </Typography>
                    <Typography variant="body2">
                      {locationInfo.latitude.toFixed(4)}, {locationInfo.longitude.toFixed(4)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </motion.div>
        )}

        {/* 날씨 정보 표시 */}
        {weatherInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                backgroundColor: 'secondary.light',
                borderRadius: 2,
                mt: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                🌤️ 날씨 정보
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    온도:
                  </Typography>
                  <Typography variant="body2">
                    {weatherInfo.temperature}°C
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    날씨:
                  </Typography>
                  <Typography variant="body2">
                    {weatherInfo.condition}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    습도:
                  </Typography>
                  <Typography variant="body2">
                    {weatherInfo.humidity}%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    풍속:
                  </Typography>
                  <Typography variant="body2">
                    {weatherInfo.windSpeed} m/s
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}

        {/* 인사말 정보 표시 */}
        {greetingInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                backgroundColor: 'success.light',
                borderRadius: 2,
                mt: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                💬 LLM 인사말
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    메시지:
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'right', maxWidth: '70%' }}>
                    {greetingInfo.message}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    색상 테마:
                  </Typography>
                  <Typography variant="body2">
                    {greetingInfo.colorTheme}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    생성 시간:
                  </Typography>
                  <Typography variant="body2">
                    {formatTimestamp(greetingInfo.timestamp)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}

        {/* 로딩 상태들 */}
        {weatherLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, p: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              날씨 정보를 가져오는 중...
            </Typography>
          </Box>
        )}

        {greetingLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, p: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              LLM 인사말을 생성하는 중...
            </Typography>
          </Box>
        )}

        {/* API 키 상태 확인 */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            🔑 API 키 상태:
          </Typography>
          
          {/* OpenWeatherMap API 키 상태 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              OpenWeatherMap API 키:
            </Typography>
            {apiKeyStatus === 'not_set' && (
              <Typography variant="body2" color="error">
                ❌ 설정되지 않음
              </Typography>
            )}
            {apiKeyStatus === 'checking' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  확인 중...
                </Typography>
              </Box>
            )}
            {apiKeyStatus === 'valid' && (
              <Typography variant="body2" color="success.main">
                ✅ 유효함
              </Typography>
            )}
            {apiKeyStatus === 'invalid' && (
              <Typography variant="body2" color="error">
                ❌ 유효하지 않음
              </Typography>
            )}
          </Box>

          {/* LLM API 키 상태 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              LLM API 키:
            </Typography>
            {(() => {
              const services = llmService.getAvailableServices();
              if (services.openai) {
                return <Typography variant="body2" color="success.main">✅ OpenAI 설정됨</Typography>;
              } else if (services.gemini) {
                return <Typography variant="body2" color="success.main">✅ Gemini 설정됨</Typography>;
              } else {
                return <Typography variant="body2" color="warning.main">⚠️ 기본 인사말 사용</Typography>;
              }
            })()}
          </Box>
          
          {apiKeyStatus === 'not_set' && (
            <Typography variant="body2" color="text.secondary">
              <strong>설정 방법:</strong><br />
              1. https://openweathermap.org/api 에서 무료 계정 생성<br />
              2. API 키 발급받기<br />
              3. 프로젝트 루트에 .env 파일 생성<br />
              4. REACT_APP_OPENWEATHER_API_KEY=your_api_key 추가<br />
              5. 개발 서버 재시작 (npm start)
            </Typography>
          )}
          
          {apiKeyStatus === 'invalid' && (
            <Typography variant="body2" color="text.secondary">
              <strong>해결 방법:</strong><br />
              1. OpenWeatherMap에서 API 키 상태 확인 (Active인지 확인)<br />
              2. 새로 생성된 API 키는 10분~2시간 활성화 시간 필요<br />
              3. 이메일 인증이 완료되었는지 확인<br />
              4. API 키가 올바르게 복사되었는지 확인<br />
              5. 잠시 후 "API 키 재확인" 버튼 클릭
            </Typography>
          )}
          
          {apiKeyStatus === 'invalid' && (
            <Button
              variant="outlined"
              size="small"
              onClick={checkApiKeyStatus}
              sx={{ mt: 1 }}
            >
              API 키 재확인
            </Button>
          )}
        </Box>

        {/* 말풍선 미리보기 */}
        {greetingInfo && (
          <Box sx={{ mt: 3, p: 4, backgroundColor: 'background.paper', borderRadius: 2, border: '2px dashed', borderColor: 'primary.light' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
              💬 말풍선 미리보기
            </Typography>
            
            {/* 실제 프로필 카드 시뮬레이션 */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '300px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden'
            }}>
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
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)
                  `,
                  zIndex: 1
                }}
              />
              
              {/* 프로필 카드 */}
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  minWidth: '280px',
                  overflow: 'visible'
                }}
              >
                {/* 말풍선 - 프로필 카드 오른쪽 상단 */}
                {showSpeechBubble && greetingInfo && (
                  <SpeechBubble
                    greetingInfo={greetingInfo}
                    onRefresh={() => {
                      if (locationInfo) {
                        const defaultWeather: WeatherInfo = {
                          temperature: 20,
                          condition: '맑음',
                          description: '기본 날씨 정보',
                          humidity: 50,
                          windSpeed: 2
                        };
                        loadGreetingInfo(locationInfo, defaultWeather);
                      }
                    }}
                    onClose={() => setShowSpeechBubble(false)}
                    position="top-right"
                    size="small"
                    showControls={true}
                  />
                )}

                <Box sx={{ position: 'relative', display: 'inline-block', width: 100, height: 100 }}>
                  <Avatar
                    src="/kyo-profile.png"
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2.5rem',
                      backgroundColor: 'primary.main',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    김
                  </Avatar>
                </Box>

                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  김규호
                </Typography>

                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  Engineer
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2, 
                    color: 'white',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'inline-block',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  총 경력 13년 9개월
                </Typography>
              </Paper>
            </Box>
            
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                <strong>💡 미리보기 설명:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                위는 실제 프로필 카드에서 말풍선이 어떻게 표시되는지 보여주는 미리보기입니다.<br />
                말풍선에 마우스를 올리면 새로고침 버튼이 나타나며, 클릭하면 새로운 인사말을 생성합니다.
              </Typography>
              
              {/* 말풍선 표시/숨김 컨트롤 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {!showSpeechBubble && greetingInfo && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowSpeechBubble(true)}
                    sx={{ 
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.50' }
                    }}
                  >
                    💬 말풍선 다시 표시
                  </Button>
                )}
                
                {showSpeechBubble && greetingInfo && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowSpeechBubble(false)}
                    sx={{ 
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.50' }
                    }}
                  >
                    🙈 말풍선 숨기기
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* 사용법 안내 */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            💡 사용법:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. "지역 정보 조회" 버튼을 클릭하여 IP 기반 지역 정보를 가져옵니다.<br />
            2. 지역 정보가 로드되면 자동으로 해당 지역의 날씨 정보도 조회됩니다.<br />
            3. 날씨 정보가 로드되면 자동으로 LLM 기반 개인화된 인사말이 생성됩니다.<br />
            4. 지역 정보는 24시간, 날씨 정보는 1시간, 인사말은 6시간 동안 캐시되어 재사용됩니다.<br />
            5. "캐시 삭제" 버튼으로 모든 캐시를 강제로 삭제할 수 있습니다.<br />
            6. <strong>LLM API 키가 없어도 기본 인사말이 생성됩니다!</strong>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LocationTest;
