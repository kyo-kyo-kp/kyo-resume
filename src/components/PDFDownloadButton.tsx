import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { useColorMode } from '../theme/ColorModeContext';

interface PDFDownloadButtonProps {
  label?: string;
  busyLabel?: string;
}

/**
 * 브라우저 인쇄로 PDF 를 만든다(html2canvas 캡처 대체).
 * 인쇄 직전에 테마를 라이트로 강제 전환하고 다이어그램이 다시 그려질 시간을 준 뒤 window.print() 를 호출한다.
 * 텍스트가 실제 텍스트로 남고, 다크 배경·잘린 캡처 문제가 없다.
 */
const PRINT_DELAY_MS = 700;

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ label = 'PDF로 저장', busyLabel = '인쇄 준비 중...' }) => {
  const { beginPrint } = useColorMode();
  const [busy, setBusy] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const handleClick = () => {
    if (busy) return;
    setBusy(true);
    beginPrint();
    timer.current = window.setTimeout(() => {
      window.print();
      setBusy(false);
    }, PRINT_DELAY_MS);
  };

  return (
    <Button
      data-pdf-button
      className="pdf-hide-in-print"
      variant="outlined"
      size="small"
      startIcon={<DownloadIcon />}
      onClick={handleClick}
      disabled={busy}
      sx={{ borderColor: 'divider', color: 'text.primary', whiteSpace: 'nowrap' }}
    >
      {busy ? busyLabel : label}
    </Button>
  );
};

export default PDFDownloadButton;
