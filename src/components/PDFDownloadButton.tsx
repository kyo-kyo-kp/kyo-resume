import React from 'react';
import { Button, Box } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { generatePDF } from 'react-to-pdf';

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLElement>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ targetRef }) => {
  const handleDownloadPDF = async () => {
    try {
      const options = {
        filename: 'kyo-resume.pdf',
        page: {
          margin: 20,
          format: 'a4',
        },
        overrides: {
          pdf: {
            compress: true,
            unit: 'mm',
          },
        },
      };

      await generatePDF(targetRef, options);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }} className="pdf-download-button">
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={handleDownloadPDF}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        이력서 PDF 다운로드
      </Button>
    </Box>
  );
};

export default PDFDownloadButton;
