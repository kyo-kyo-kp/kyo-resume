# Kyo's Resume SPA

React + TypeScript + Material UI로 구축된 개인 이력서 Single Page Application (SPA) 프로젝트입니다.

## 🚀 프로젝트 개요

이 프로젝트는 개인 이력을 체계적으로 정리하고 시각적으로 표현하는 현대적인 웹 애플리케이션입니다. 반응형 디자인과 인터랙티브한 요소를 통해 사용자에게 최적화된 경험을 제공합니다.

## 🛠️ 기술 스택

- **Frontend Framework**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion (MUI 기본 스타일링)
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Build Tool**: Create React App

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 서버 시작 (http://localhost:3000)
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

### 테스트
```bash
# 테스트 실행
npm test
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 네비게이션 헤더
│   ├── HeroSection.tsx # 메인 히어로 섹션
│   └── AboutSection.tsx # About Me 섹션
├── data/               # 데이터 파일
│   └── resumeData.ts   # 이력서 데이터
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 정의
├── App.tsx             # 메인 App 컴포넌트
└── index.tsx           # 앱 진입점
```

## 🎨 주요 기능

### ✅ 구현 완료
- **반응형 네비게이션**: 스크롤 시 투명도 변화, 모바일 햄버거 메뉴
- **히어로 섹션**: 그라데이션 배경, 애니메이션 효과, 소셜 링크
- **About Me 섹션**: 개인 정보, 관심사, 개발 철학
- **Material-UI 테마**: 커스텀 색상 팔레트 및 타이포그래피
- **IP 기반 지역 유추**: 사용자 위치 자동 감지 및 캐싱
- **날씨 정보 연동**: OpenWeatherMap API를 활용한 실시간 날씨 정보

### 🚧 구현 예정
- **LLM 기반 인사말**: OpenAI/Gemini API를 활용한 개인화된 인사말 생성
- **말풍선 UI**: 프로필 사진 위에 표시되는 인터랙티브한 말풍선
- **Experience 섹션**: 경력 정보 타임라인
- **Skills 섹션**: 기술 스택 시각화 (차트, 프로그레스 바)
- **Projects 섹션**: 포트폴리오 갤러리
- **Contact 섹션**: 연락처 폼 및 정보

## 🎯 주요 특징

### 디자인
- **모던한 UI/UX**: Material Design 3 기반
- **반응형 디자인**: 모든 디바이스 최적화
- **애니메이션**: Framer Motion을 활용한 부드러운 전환 효과
- **접근성**: WCAG 가이드라인 준수

### 기술적 특징
- **TypeScript**: 타입 안정성 보장
- **컴포넌트 기반**: 재사용 가능한 모듈화된 구조
- **성능 최적화**: 코드 스플리팅 및 지연 로딩
- **SEO 친화적**: 메타 태그 및 구조화된 데이터

## 📊 데이터 구조

프로젝트는 `src/data/resumeData.ts` 파일에서 중앙 집중식으로 데이터를 관리합니다:

```typescript
// 개인 정보
export const personalInfo: PersonalInfo = {
  name: "Kyo",
  title: "Software Developer",
  // ... 기타 정보
};

// 경력 정보
export const experiences: Experience[] = [
  // ... 경력 데이터
];

// 기술 스택
export const skills: Skill[] = [
  // ... 기술 데이터
];
```

## 🚀 배포

### Vercel 배포 (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify 배포
```bash
# 빌드 후 dist 폴더를 Netlify에 업로드
npm run build
```

## 🔧 커스터마이징

### 색상 테마 변경
`src/App.tsx`의 `theme` 객체에서 색상을 수정할 수 있습니다:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea', // 메인 색상
    },
    // ... 기타 색상 설정
  },
});
```

### 데이터 수정
`src/data/resumeData.ts` 파일에서 개인 정보, 경력, 프로젝트 등을 수정할 수 있습니다.

## 🌤️ 날씨 인사말 기능 설정

### API 키 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# OpenWeatherMap API 키 (날씨 정보용)
# https://openweathermap.org/api 에서 무료 계정 생성 후 API 키 발급
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key_here

# OpenAI API 키 (LLM 인사말 생성용)
# https://platform.openai.com/api-keys 에서 API 키 발급
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API 키 (OpenAI 대신 사용할 경우)
# https://makersuite.google.com/app/apikey 에서 API 키 발급
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### API 서비스별 특징
- **OpenWeatherMap**: 무료 tier 1,000 calls/day
- **OpenAI GPT**: 사용량 기반 과금 (월 $5-20 예상)
- **Google Gemini**: 무료 tier 제공

### 캐싱 정책
- **지역 정보**: 24시간 캐시 (IP는 자주 변경되지 않음)
- **날씨 정보**: 1시간 캐시 (날씨는 자주 변함)
- **LLM 응답**: 6시간 캐시 (같은 조건에서 재사용)

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

프로젝트 개선을 위한 기여를 환영합니다. Pull Request를 통해 기여해주세요.

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**개발자**: Kyo  
**버전**: 1.0.0  
**최종 업데이트**: 2024년 12월
