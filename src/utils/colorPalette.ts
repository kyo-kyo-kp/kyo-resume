// 무지개색 7가지 컬러 팔레트
export const rainbowColors = [
  {
    name: '빨강',
    primary: '#FF6B6B',
    secondary: '#FF5252',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)'
  },
  {
    name: '주황',
    primary: '#FF8E53',
    secondary: '#FF7043',
    gradient: 'linear-gradient(135deg, #FF8E53 0%, #FF7043 100%)'
  },
  {
    name: '노랑',
    primary: '#FFD93D',
    secondary: '#FFC107',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFC107 100%)'
  },
  {
    name: '초록',
    primary: '#4ECDC4',
    secondary: '#26A69A',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #26A69A 100%)'
  },
  {
    name: '파랑',
    primary: '#45B7D1',
    secondary: '#1976D2',
    gradient: 'linear-gradient(135deg, #45B7D1 0%, #1976D2 100%)'
  },
  {
    name: '남색',
    primary: '#6C5CE7',
    secondary: '#5F35A1',
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #5F35A1 100%)'
  },
  {
    name: '보라',
    primary: '#A29BFE',
    secondary: '#8B7EC8',
    gradient: 'linear-gradient(135deg, #A29BFE 0%, #8B7EC8 100%)'
  }
];

// 랜덤 컬러 선택 함수
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * rainbowColors.length);
  return rainbowColors[randomIndex];
};

// 세션 스토리지에서 컬러 가져오기 (새로고침 시에도 유지)
export const getSessionColor = () => {
  const savedColorIndex = sessionStorage.getItem('selectedColorIndex');
  
  if (savedColorIndex !== null) {
    const index = parseInt(savedColorIndex);
    return rainbowColors[index];
  }
  
  // 저장된 컬러가 없으면 랜덤 선택하고 저장
  const randomColor = getRandomColor();
  const colorIndex = rainbowColors.findIndex(color => color.name === randomColor.name);
  sessionStorage.setItem('selectedColorIndex', colorIndex.toString());
  
  return randomColor;
};

// 컬러 변경 함수 (수동으로 컬러 변경 시 사용)
export const changeColor = () => {
  const newColor = getRandomColor();
  const colorIndex = rainbowColors.findIndex(color => color.name === newColor.name);
  sessionStorage.setItem('selectedColorIndex', colorIndex.toString());
  return newColor;
};
