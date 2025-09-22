# 🌤️ LLM 기반 날씨 인사말 기능 구상서

## 📋 프로젝트 개요

사용자의 IP 기반 지역 유추와 날씨 정보를 활용하여 LLM으로 개인화된 인사말을 생성하고, 프로필 사진에 말풍선으로 표시하는 기능을 구현합니다.

## 🎯 핵심 기능

### 1. **IP 기반 지역 유추**
- 사용자 IP 주소를 기반으로 국가, 도시, 지역 정보 획득
- 무료 IP Geolocation API 활용 (ipapi.co 또는 ipinfo.io)

### 2. **날씨 정보 조회**
- 유추된 지역의 현재 날씨 정보 조회
- OpenWeatherMap API 활용 (무료 tier: 1,000 calls/day)

### 3. **LLM 기반 인사말 생성**
- 지역과 날씨 정보를 바탕으로 개인화된 인사말 생성
- OpenAI GPT API 또는 Google Gemini API 활용

### 4. **UI/UX 구현**
- 프로필 사진 위에 말풍선 형태의 툴팁 표시
- 기존 7가지 색상 팔레트와 연동
- Framer Motion을 활용한 애니메이션 효과

## 🏗️ 기술 아키텍처

### 컴포넌트 구조
```
src/
├── components/
│   ├── WeatherGreeting.tsx          # 메인 컴포넌트
│   └── SpeechBubble.tsx             # 말풍선 UI 컴포넌트
├── services/
│   ├── LocationService.ts           # IP → 지역 변환
│   ├── WeatherService.ts            # 날씨 API 호출
│   └── LLMService.ts                # 인사말 생성
├── types/
│   └── weatherGreeting.ts           # 타입 정의
└── utils/
    └── weatherCache.ts              # 캐싱 유틸리티
```

### 데이터 흐름
```
사용자 접속 
    ↓
IP 기반 지역 유추 (LocationService)
    ↓
날씨 정보 조회 (WeatherService)
    ↓
LLM 인사말 생성 (LLMService)
    ↓
UI 렌더링 (WeatherGreeting + SpeechBubble)
```

## 📊 데이터 모델

### WeatherGreetingData
```typescript
interface WeatherGreetingData {
  location: {
    country: string;
    city: string;
    region: string;
    timezone: string;
  };
  weather: {
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
  };
  greeting: {
    message: string;
    colorTheme: string; // 7가지 색상 중 선택
    timestamp: number;
  };
}
```

## 🔧 API 연동 계획

### 1. IP Geolocation API
- **서비스**: ipapi.co (무료 tier: 1,000 calls/month)
- **엔드포인트**: `https://ipapi.co/json/`
- **응답 예시**:
```json
{
  "ip": "123.456.789.0",
  "city": "Seoul",
  "region": "Seoul",
  "country": "KR",
  "country_name": "South Korea",
  "timezone": "Asia/Seoul"
}
```

### 2. Weather API
- **서비스**: OpenWeatherMap (무료 tier: 1,000 calls/day)
- **엔드포인트**: `https://api.openweathermap.org/data/2.5/weather`
- **파라미터**: `lat`, `lon`, `appid`
- **응답 예시**:
```json
{
  "main": {
    "temp": 15.5,
    "humidity": 65
  },
  "weather": [{
    "main": "Clear",
    "description": "clear sky"
  }],
  "wind": {
    "speed": 3.2
  }
}
```

### 3. LLM API
- **서비스**: OpenAI GPT-3.5-turbo
- **프롬프트 템플릿**:
```
당신은 친근한 개발자 김규호입니다. 
사용자가 {지역}에서 접속했고, 현재 날씨는 {날씨상태}, 온도는 {온도}도입니다.
이 정보를 바탕으로 개발자 포트폴리오 방문자에게 친근하고 개성있는 인사말을 작성해주세요.

요구사항:
- 50자 이내로 간결하게
- 개발자다운 유머나 기술적 언급 포함
- 날씨와 지역 특성을 반영
- 친근하면서도 전문적인 톤
```

## 🎨 UI/UX 디자인

### 말풍선 디자인
- **위치**: 프로필 사진 우상단
- **스타일**: 둥근 모서리, 그림자 효과
- **애니메이션**: 
  - 등장: fadeIn + slideDown
  - 호버: scale(1.05)
  - 클릭: 말풍선 내용 변경

### 색상 테마 연동
- 기존 7가지 무지개 색상 팔레트 활용
- 날씨 상태에 따른 색상 매핑:
  - 맑음: 노랑/주황
  - 흐림: 회색/남색
  - 비: 파랑/보라
  - 눈: 하양/연파랑

## ⚡ 성능 최적화

### 캐싱 전략
- **지역 정보**: 24시간 캐시 (IP는 자주 변경되지 않음)
- **날씨 정보**: 1시간 캐시 (날씨는 자주 변함)
- **LLM 응답**: 6시간 캐시 (같은 조건에서 재사용)

### 로딩 상태
- **스켈레톤 UI**: 로딩 중일 때 말풍선 자리 표시
- **점진적 로딩**: 지역 → 날씨 → LLM 순차적 표시
- **에러 처리**: API 실패 시 기본 인사말 표시

## 🔒 보안 및 프라이버시

### 데이터 보호
- IP 정보는 지역 유추 목적으로만 사용
- 사용자 개인정보 수집하지 않음
- API 키는 환경변수로 관리

### 에러 처리
- API 실패 시 기본 인사말 표시
- 네트워크 오류 시 graceful degradation
- 사용자에게 오류 상황 투명하게 안내

## 💰 비용 분석

### 예상 월 비용
- **IP API**: 무료 (1,000 calls/month)
- **날씨 API**: 무료 (1,000 calls/day)
- **LLM API**: $5-20 (사용량에 따라)

### 최적화 방안
- 캐싱을 통한 API 호출 최소화
- 무료 tier 한도 내에서 운영
- 필요시 유료 플랜으로 업그레이드

## 🚀 구현 단계

### Phase 1: 기본 인프라
1. IP 기반 지역 유추 서비스 구현
2. 날씨 API 연동 서비스 구현
3. 기본 타입 정의 및 인터페이스 구성

### Phase 2: LLM 연동
1. LLM API 연동 서비스 구현
2. 프롬프트 최적화 및 테스트
3. 응답 품질 검증

### Phase 3: UI/UX 구현
1. 말풍선 컴포넌트 구현
2. 애니메이션 효과 추가
3. AboutSection에 통합

### Phase 4: 최적화
1. 캐싱 시스템 구현
2. 에러 처리 강화
3. 성능 최적화

## 📈 향후 확장 계획

### 추가 기능
- 시간대별 다른 인사말 (아침/점심/저녁)
- 계절별 특별한 메시지
- 사용자 행동 패턴 분석 (선택사항)

### 기술적 개선
- PWA 지원으로 오프라인 캐싱
- WebSocket을 통한 실시간 날씨 업데이트
- 다국어 지원

## 🎯 성공 지표

### 사용자 경험
- 페이지 로딩 시간 < 3초
- 인사말 생성 시간 < 2초
- 사용자 만족도 향상

### 기술적 지표
- API 호출 성공률 > 95%
- 캐시 히트율 > 80%
- 에러 발생률 < 5%

---

*이 구상서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
