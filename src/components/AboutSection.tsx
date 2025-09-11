import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  Code,
  Psychology,
  School,
  Work,
  Favorite
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../types';
import { education } from '../data/resumeData';
import { getCareerPeriodStringShort, getEmploymentPeriodString } from '../utils/careerCalculator';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

const AboutSection: React.FC<AboutSectionProps> = ({ personalInfo }) => {
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

  const expertise = [
    { icon: <Code />, label: '백엔드 개발', description: 'Java, Python 기반 시스템 개발 및 운영' },
    { icon: <Psychology />, label: '데이터 엔지니어링', description: 'AWS Redshift, Athena, Airflow를 활용한 데이터 파이프라인 구축' },
    { icon: <School />, label: '시스템 아키텍처', description: '모놀리식에서 마이크로서비스까지 다양한 아키텍처 설계' },
    { icon: <Work />, label: '프로젝트 리딩', description: '파트 리드로서 시스템 리뉴얼 및 신규 서비스 구축 주도' },
    { icon: <Favorite />, label: '글로벌 플랫폼', description: '다국가 서비스 운영 및 글로벌 정산 시스템 구축' }
  ];

  const values = [
    '사용자 중심 사고',
    '지속적인 학습',
    '품질 중심 개발',
    '효율적인 문제 해결',
    '팀 협력과 소통'
  ];


  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Professional Journey
            </Typography>
            
            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 6,
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              {getCareerPeriodStringShort('2011-12-01')}
            </Typography>
          </motion.div>



          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* 왼쪽: 개인 정보 */}
            <Box sx={{ flex: { md: 1 } }}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src="/kyo-profile2.png"
                      sx={{
                        width: 80,
                        height: 80,
                        mr: 3,
                        fontSize: '2rem',
                        backgroundColor: 'primary.main'
                      }}
                    >
                      {personalInfo.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {personalInfo.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {personalInfo.title}
                        {education && education.length > 0 && (
                          <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '0.9em' }}>
                            {' '}({education[0].school} · {education[0].field} · {education[0].degree})
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                    경력 하이라이트
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      🏢 카카오픽코마
                      <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '0.8em' }}>
                        {' '}({getEmploymentPeriodString('2022-03-01')})
                      </Typography>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      • 개발4실 데이터 인텔리전스팀 (2024.07~): 일본 데이터 엔지니어링 업무 수행, 작품별 추천 구현
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      • 글로벌개발본부 플랫폼개발팀 (2022.03~2024.06): 프랑스 픽코마 정산, 개인화 추천, ETL, KPI 고도화
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      🎮 넥슨코리아
                      <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '0.8em' }}>
                        {' '}({getEmploymentPeriodString('2018-11-01', '2022-03-01')})
                      </Typography>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      • 인텔리전스랩스 라이브플랫폼실 (2021.10~): 넥슨플레이, 스푼플러스 앱 백엔드 운영
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      • 기술본부 개발기술실 (2018.11~2021.09): 사내 시스템 리뉴얼, 채용 인성검사 시스템 구축
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      🎁 케이티엠하우스
                      <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '0.8em' }}>
                        {' '}({getEmploymentPeriodString('2013-04-01', '2018-10-01')})
                      </Typography>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      기프티쇼 백엔드 시스템 운영, 쿠폰 발송 파이프라인, POS 연동 모듈 개발
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    핵심 역량
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {values.map((value, index) => (
                      <Chip
                        key={index}
                        label={value}
                        variant="outlined"
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Box>

            {/* 오른쪽: 관심사 */}
            <Box sx={{ flex: { md: 1 } }}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                    전문 분야 & 핵심 역량
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {expertise.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: 'primary.light',
                              '& .MuiSvgIcon-root': {
                                color: 'primary.main'
                              }
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Box
                            sx={{
                              mr: 2,
                              p: 1,
                              borderRadius: 1,
                              backgroundColor: 'primary.light',
                              color: 'primary.main'
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {item.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </Box>

          {/* 추가 정보 섹션 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                mt: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                개발 철학
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: { md: 1 }, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    사용자 중심
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    사용자의 니즈를 최우선으로 고려하여 직관적이고 효율적인 인터페이스를 설계합니다.
                  </Typography>
                </Box>
                <Box sx={{ flex: { md: 1 }, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    코드 품질
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    깔끔하고 유지보수가 용이한 코드를 작성하여 장기적인 프로젝트 성공을 추구합니다.
                  </Typography>
                </Box>
                <Box sx={{ flex: { md: 1 }, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    지속적 학습
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    새로운 기술과 트렌드를 지속적으로 학습하여 최신 개발 방법론을 적용합니다.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutSection;
