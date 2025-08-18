import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PDFDownloadButton: React.FC = () => {
  const handleDownloadPDF = async () => {
    // PDF에서 숨길 요소들을 위한 변수들
    let elementsToHide: NodeListOf<Element> | null = null;
    let originalDisplays: string[] = [];
    let originalColors: string[] = [];
    
    try {
      // 로딩 표시
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'PDF 생성 중...';
      }

      // 캡처 품질/배경 보정: 캡처 동안 전체를 흰색으로 강제 (App.css의 .pdf-capture 규칙 활용)
      document.body.classList.add('pdf-capture');
      
      // PDF에서 숨길 요소들을 직접 제거
      elementsToHide = document.querySelectorAll('.pdf-hide-in-print, [data-pdf-button], a[href*="notion"]');
      
      elementsToHide.forEach((el, index) => {
        originalDisplays[index] = (el as HTMLElement).style.display || '';
        (el as HTMLElement).style.display = 'none';
      });

      // 메인 요약 텍스트 색상 강제 변경
      const summaryElements = document.querySelectorAll('#home p, #home .MuiTypography-body1, #home div[style*="color"]');
      const originalColors: string[] = [];
      
      summaryElements.forEach((el, index) => {
        const element = el as HTMLElement;
        originalColors[index] = element.style.color || '';
        element.style.color = '#000000';
        element.style.webkitTextFillColor = '#000000';
        element.style.textShadow = 'none';
      });

      // 섹션별로 내부 컨테이너를 캡처하여 좌측 회색 배경 배제
      const sections = ['home', 'about', 'experience'];
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - margin * 2; // 190mm
      const contentHeight = pageHeight - margin * 2; // 예: 277mm
      let currentY = margin; // 시작 위치

      for (let i = 0; i < sections.length; i += 1) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);
        if (!section) continue;

        // 섹션 내부의 MUI 컨테이너 우선 캡처
        const target = (section.querySelector('.MuiContainer-root') as HTMLElement) || section;

        const canvas = await html2canvas(target, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        // 픽셀/밀리미터 변환 계산
        const pxPerMm = canvas.width / contentWidth; // px per mm
        const pageHeightPx = contentHeight * pxPerMm; // 한 페이지에 들어갈 수 있는 px 높이

        // 섹션 시작은 항상 새 페이지 상단에서 시작 (중간 잘림 방지)
        if (currentY !== margin) {
          pdf.addPage();
          currentY = margin;
        }

        // 섹션을 페이지 높이 단위로 잘라서 렌더링
        for (let y = 0; y < canvas.height; y += pageHeightPx) {
          const sliceHeightPx = Math.min(pageHeightPx, canvas.height - y);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceHeightPx;
          const ctx = sliceCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              y,
              canvas.width,
              sliceHeightPx,
              0,
              0,
              canvas.width,
              sliceHeightPx
            );
          }
          const sliceImgData = sliceCanvas.toDataURL('image/png');
          const sliceHeightMm = sliceHeightPx / pxPerMm;

          // 현재 페이지에 슬라이스 삽입
          pdf.addImage(sliceImgData, 'PNG', margin, currentY, contentWidth, sliceHeightMm);

          // 다음 슬라이스는 새 페이지 상단에서 시작
          if (y + sliceHeightPx < canvas.height) {
            pdf.addPage();
            currentY = margin;
          } else {
            currentY = margin;
          }
        }

        // 다음 섹션이 이어지면 새 페이지로 넘겨 시작
        if (i < sections.length - 1) {
          pdf.addPage();
          currentY = margin;
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
    } finally {
      // 원래 스타일 복원 및 캡처용 클래스 제거
      if (elementsToHide) {
        elementsToHide.forEach((el, index) => {
          (el as HTMLElement).style.display = originalDisplays[index];
        });
      }

      // 메인 요약 텍스트 색상 복원
      const summaryElements = document.querySelectorAll('#home p, #home .MuiTypography-body1, #home div[style*="color"]');
      summaryElements.forEach((el, index) => {
        const element = el as HTMLElement;
        if (originalColors[index]) {
          element.style.color = originalColors[index];
          element.style.webkitTextFillColor = '';
          element.style.textShadow = '';
        }
      });
      
      document.body.classList.remove('pdf-capture');
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
