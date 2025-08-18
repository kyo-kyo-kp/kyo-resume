import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip
} from '@mui/material';
import {
  Business,
  CalendarToday
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Experience } from '../types';
import PDFDownloadButton from './PDFDownloadButton';
import { getEmploymentPeriodString } from '../utils/careerCalculator';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box
      id="experience"
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
                mb: 6,
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              경력 사항
            </Typography>
          </motion.div>

          <Box sx={{ position: 'relative' }}>
            {/* 타임라인 중앙선 */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: 20, md: '50%' },
                top: 0,
                bottom: 0,
                width: 2,
                backgroundColor: 'primary.main',
                transform: { md: 'translateX(-50%)' },
                zIndex: 1
              }}
            />

            {experiences.map((experience, index) => (
              <Box
                key={experience.id}
                sx={{
                  position: 'relative',
                  mb: 4,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  alignItems: { md: 'center' }
                }}
              >
                <motion.div
                  variants={itemVariants}
                  style={{ width: '100%' }}
                >
                  {/* 타임라인 점 */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: 16, md: '50%' },
                      top: { xs: 20, md: '50%' },
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      border: '3px solid white',
                      transform: { md: 'translate(-50%, -50%)' },
                      zIndex: 2,
                      boxShadow: 2
                    }}
                  />

                  {/* 경력 카드 */}
                  <Box
                    sx={{
                      flex: { md: 1 },
                      ml: { xs: 4, md: index % 2 === 0 ? 0 : 4 },
                      mr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                      mt: { xs: 0, md: 0 }
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      {/* 회사명과 직책 */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Business sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {experience.company}
                        </Typography>
                      </Box>

                      <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                        {experience.position}
                      </Typography>

                      {/* 기간 */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
                        <Typography variant="body2" color="text.secondary">
                          {experience.period}
                          {experience.id === "1" && (
                            <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.85em' }}>
                              {' '}({getEmploymentPeriodString('2022-03-01')})
                            </Typography>
                          )}
                          {experience.id === "2" && (
                            <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.85em' }}>
                              {' '}({getEmploymentPeriodString('2018-11-01', '2022-03-01')})
                            </Typography>
                          )}
                          {experience.id === "3" && (
                            <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.85em' }}>
                              {' '}({getEmploymentPeriodString('2013-04-01', '2018-10-01')})
                            </Typography>
                          )}
                          {experience.id === "4" && (
                            <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.85em' }}>
                              {' '}({getEmploymentPeriodString('2011-12-01', '2013-01-01')})
                            </Typography>
                          )}
                        </Typography>
                      </Box>

                      {/* 업무 설명 */}
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {experience.description}
                      </Typography>

                      {/* 기술 스택 */}
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          사용 기술
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {experience.technologies.map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* 주요 성과 */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                            주요 성과
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <Typography
                                key={achievementIndex}
                                component="li"
                                variant="body2"
                                sx={{ mb: 0.5, lineHeight: 1.5 }}
                              >
                                {achievement}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Box>

          {/* 포트폴리오 링크 */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                mt: 6,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textAlign: 'center',
                color: 'white'
              }}
              className="pdf-hide-in-print"
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                더 궁금한 점이 있으시다면?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                노션에 더 자세한 프로젝트와 경험을 정리해두었어요.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Box
                  component="a"
                  href="https://kyo-tigger.notion.site/kyo-s-resume-57834551f5ba4368b62f0b48304b10b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-block',
                    px: 4,
                    py: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  포트폴리오 보기
                </Box>
                <PDFDownloadButton />
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ExperienceSection;
