import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFDownloadButton: React.FC = () => {
  const handleDownloadPDF = async () => {
    try {
      // 로딩 표시
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'PDF 생성 중...';
      }

      // 각 섹션을 순차적으로 캡처
      const sections = ['home', 'about', 'experience'];
      const pdf = new jsPDF('p', 'mm', 'a4');
      let currentY = 10; // 시작 위치

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          try {
            const canvas = await html2canvas(section, {
              scale: 1.2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#ffffff',
              logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // 여백 고려
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // 새 페이지가 필요한지 확인
            if (currentY + imgHeight > 280) {
              pdf.addPage();
              currentY = 10;
            }

            pdf.addImage(imgData, 'PNG', 10, currentY, imgWidth, imgHeight);
            currentY += imgHeight + 10; // 섹션 간 간격
          } catch (sectionError) {
            console.warn(`섹션 ${sectionId} 캡처 실패:`, sectionError);
          }
        }
      }

      // PDF 다운로드
      pdf.save('kyo-resume.pdf');

      // 버튼 상태 복원
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DownloadIcon"><path d="M5 20h14v-2H5v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>PDF 다운로드';
      }
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
      
      // 버튼 상태 복원
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DownloadIcon"><path d="M5 20h14v-2H5v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>PDF 다운로드';
      }
    }
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<DownloadIcon />}
      onClick={handleDownloadPDF}
      data-pdf-button
      sx={{
        borderRadius: 2,
        px: 3,
        py: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      PDF 다운로드
    </Button>
  );
};

export default PDFDownloadButton;
