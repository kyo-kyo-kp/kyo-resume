// 경력 기간 계산 유틸리티

export interface CareerPeriod {
  years: number;
  months: number;
  totalMonths: number;
  formattedString: string;
}

export const calculateCareerPeriod = (startDate: string): CareerPeriod => {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  
  // 월이 음수인 경우 처리
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // 일자 비교로 정확한 계산
  if (now.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  const totalMonths = years * 12 + months;
  
  // 한국어 형식으로 포맷팅
  const formattedString = `${years}년 ${months}개월`;
  
  return {
    years,
    months,
    totalMonths,
    formattedString
  };
};

export const getCareerPeriodString = (startDate: string): string => {
  const period = calculateCareerPeriod(startDate);
  const formattedDate = startDate.replace(/-/g, '.');
  return `${period.formattedString} (${formattedDate} - 현재)`;
};

export const getCareerPeriodStringShort = (startDate: string): string => {
  const period = calculateCareerPeriod(startDate);
  const formattedDate = startDate.replace(/-/g, '.');
  return `${period.formattedString}의 경력 (${formattedDate} - 현재)`;
};

// 특정 기간의 재직 기간 계산 (시작일-종료일)
export const calculateEmploymentPeriod = (startDate: string, endDate?: string): CareerPeriod => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  // 월이 음수인 경우 처리
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // 일자 비교로 정확한 계산
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  const totalMonths = years * 12 + months;
  
  // 한국어 형식으로 포맷팅
  const formattedString = `${years}년 ${months}개월`;
  
  return {
    years,
    months,
    totalMonths,
    formattedString
  };
};

export const getEmploymentPeriodString = (startDate: string, endDate?: string): string => {
  const period = calculateEmploymentPeriod(startDate, endDate);
  return period.formattedString;
};
