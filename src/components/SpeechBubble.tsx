import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Close, Refresh, ChatBubble, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { GreetingInfo } from '../types/weatherGreeting';
import { rainbowColors } from '../utils/colorPalette';

interface SpeechBubbleProps {
  greetingInfo: GreetingInfo | null;
  onRefresh?: () => void;
  onClose?: () => void;
  onClearCache?: () => void; // 캐시 삭제 함수
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
  showControls?: boolean;
  currentColor?: any; // 현재 선택된 색상
  isLoading?: boolean; // 로딩 상태
}

/**
 * 인터랙티브한 말풍선 컴포넌트
 * 프로필 사진 위에 표시되는 개인화된 인사말을 담은 말풍선
 */
const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  greetingInfo,
  onRefresh,
  onClose,
  onClearCache,
  position = 'top-right',
  size = 'medium',
  showControls = true,
  currentColor,
  isLoading = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 인사말이 로드되거나 로딩 중일 때 자동으로 표시
  useEffect(() => {
    if (greetingInfo || isLoading) {
      setIsVisible(true);
    }
  }, [greetingInfo, isLoading]);

  // 색상 테마에 따른 스타일 설정
  const getColorTheme = () => {
    // currentColor가 있으면 우선 사용, 없으면 greetingInfo의 색상 사용
    if (currentColor) return currentColor;
    if (!greetingInfo) return rainbowColors[0];
    return rainbowColors.find(color => color.name === greetingInfo.colorTheme) || rainbowColors[0];
  };

  const colorTheme = getColorTheme();

  // 글자수에 따른 동적 크기 계산
  const getDynamicSize = () => {
    if (!greetingInfo) return 'medium';
    
    const textLength = greetingInfo.message.length;
    
    if (textLength <= 20) return 'large';
    if (textLength <= 40) return 'medium';
    return 'small';
  };

  // 크기별 스타일 설정
  const getSizeStyles = () => {
    const dynamicSize = getDynamicSize();
    const textLength = greetingInfo?.message.length || 0;
    
    // 글자수에 따른 동적 너비 계산
    const getDynamicWidth = () => {
      if (textLength <= 15) return '160px';
      if (textLength <= 25) return '180px';
      if (textLength <= 35) return '200px';
      if (textLength <= 50) return '220px';
      return '240px';
    };
    
    switch (dynamicSize) {
      case 'small':
        return {
          maxWidth: getDynamicWidth(),
          fontSize: '0.65rem',
          padding: '5px 8px',
          lineHeight: 1.2,
          minWidth: '120px'
        };
      case 'large':
        return {
          maxWidth: getDynamicWidth(),
          fontSize: '0.85rem',
          padding: '8px 12px',
          lineHeight: 1.4,
          minWidth: '140px'
        };
      default: // medium
        return {
          maxWidth: getDynamicWidth(),
          fontSize: '0.75rem',
          padding: '6px 10px',
          lineHeight: 1.3,
          minWidth: '130px'
        };
    }
  };

  // 위치별 스타일 설정
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return {
          top: '5px',
          left: '5px',
          transform: 'translateY(-100%)'
        };
      case 'bottom-right':
        return {
          bottom: '-10px',
          right: '-10px',
          transform: 'translateY(100%)'
        };
      case 'bottom-left':
        return {
          bottom: '-10px',
          left: '-10px',
          transform: 'translateY(100%)'
        };
      default: // top-right
        return {
          top: '15px',
          right: '15px',
          transform: 'translateY(-100%)',
          maxWidth: '240px'
        };
    }
  };


  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleRefresh = () => {
    onRefresh?.();
  };

  if ((!greetingInfo && !isLoading) || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.8, 
          y: 20,
          transition: { duration: 0.2 }
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        style={{
          position: 'absolute',
          zIndex: 10,
          ...getPositionStyles()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 말풍선 본체 */}
        <Box
          sx={{
            position: 'relative',
            backgroundColor: colorTheme.primary,
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.5s ease',
            maxWidth: '240px',
            minWidth: '120px',
            overflow: 'visible',
            '&:hover': {
              boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
            }
          }}
        >
          {/* 말풍선 내용 */}
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40px',
                ...getSizeStyles()
              }}
            >
              {/* 로딩 애니메이션 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        opacity: 0.4,
                        transform: 'scale(1)'
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'scale(1.2)'
                      }
                    },
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        opacity: 0.4,
                        transform: 'scale(1)'
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'scale(1.2)'
                      }
                    },
                    animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                  }}
                />
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '@keyframes pulse': {
                      '0%, 100%': {
                        opacity: 0.4,
                        transform: 'scale(1)'
                      },
                      '50%': {
                        opacity: 1,
                        transform: 'scale(1.2)'
                      }
                    },
                    animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                textAlign: 'center',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                whiteSpace: 'normal',
                hyphens: 'auto',
                ...getSizeStyles()
              }}
            >
              {greetingInfo?.message}
            </Typography>
          )}

          {/* 컨트롤 버튼들 */}
          {showControls && (
            <Box
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: 0.5,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.2s ease'
              }}
            >
              {onRefresh && (
                <Tooltip title="새로고침">
                  <IconButton
                    size="small"
                    onClick={handleRefresh}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: colorTheme.primary,
                      width: 20,
                      height: 20,
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Refresh sx={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              )}
              
              {onClearCache && (
                <Tooltip title="캐시 삭제">
                  <IconButton
                    size="small"
                    onClick={onClearCache}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: colorTheme.primary,
                      width: 20,
                      height: 20,
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Delete sx={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              )}
              
              {onClose && (
                <Tooltip title="닫기">
                  <IconButton
                    size="small"
                    onClick={handleClose}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: colorTheme.primary,
                      width: 20,
                      height: 20,
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}

        </Box>

        {/* 펄스 애니메이션 제거 - 배경 문제 해결 */}
      </motion.div>
    </AnimatePresence>
  );
};

export default SpeechBubble;
