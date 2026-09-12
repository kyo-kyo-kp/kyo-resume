# Kyo's Resume

김규호 Kyuho Kim (Kyo) · Data Product Engineer & Team Lead 의 이력서 사이트.
React 19 + TypeScript 5 + MUI 7 로 만든 단일 페이지이며, 콘텐츠(한국어·영어)와 화면을 분리해 둔 것이 구조의 핵심이다.

## 구조

```
src/
  content/            콘텐츠. ko/ 가 원본, en/ 은 번역. 같은 SiteContent 타입을 공유
    ko/  en/          profile · platform · cases(A~G) · principles · aiWorkflow · journey · stack · leadership
    index.ts          getContent(locale)
  i18n/               LocaleContext(로케일 상태·훅), strings(섹션 제목·라벨 같은 UI 문구)
  theme/              MUI 테마(다크 기본, 악센트 1색), ColorModeContext
  components/
    layout/           Header(내비·KO/EN·테마·PDF), SectionShell, Footer
    sections/         Hero → Platform → Stories → HowIWork → AiWorkflow → Journey → Stack → Leadership → Contact
    ui/               CaseCard, MermaidDiagram, Labeled, TagList, Reveal
  data/resumeData.ts  회사별 상세(경력·학력·자격). Journey 아코디언이 사용
  types/              content.ts(콘텐츠 타입), index.ts(기존 데이터 타입)
```

섹션 순서는 채용 담당자가 스캔하는 순서다. 첫 화면은 포지셔닝 한 문장과 "내가 푸는 문제" 세 줄, 두 번째 화면은 데이터 플랫폼 아키텍처(운영 중 → 설계)다.

## 콘텐츠 규칙

- 카드 제목·헤드라인에 숫자를 쓰지 않는다. 숫자는 각주(`evidence`)에만, 상대 표현으로.
- 플랫폼 규모는 회사가 공개한 수치 또는 자릿수 표현만, 문제 맥락에서 한 번만.
- 사내 시스템·계정 이름, 테이블명, 동료 이름, 내부 URL, 비즈니스 수치, 로드맵 일정은 쓰지 않는다.
- 계획 중인 것은 "설계했다"까지만.
- **문체**: 서술 문장은 합쇼체(~합니다). 제목·표 셀·태그는 명사형. How I work 의 원칙 제목만 좌우명이라 해라체를 유지한다. 1인칭은 "제가/저는"으로 쓰거나 생략한다.
- 문구를 바꿀 때는 `content/ko` 를 먼저 고치고 `content/en` 을 맞춘다. 코드 안 `TODO(kyo)` 는 채워야 할 자리.

## 실행

```bash
npm install
npm start          # http://localhost:3000
npm test           # 스모크 테스트 (이름 렌더, 케이스 카드 7개)
npm run build      # 프로덕션 빌드
npx tsc --noEmit   # 타입 체크
```

외부 API 키나 환경변수는 없다. 다이어그램은 `mermaid` 를 동적 import 로 렌더한다.
`.npmrc` 의 `legacy-peer-deps=true` 는 react-scripts 5 가 TypeScript 5 를 peer 로 인정하지 않아 둔 것이다.

## PDF

헤더의 "PDF로 저장"은 브라우저 인쇄 대화상자를 연다(대상: PDF로 저장). 인쇄 직전에 테마가 라이트로 강제 전환되고, 접힌 회사별 상세가 펼쳐지며, 스크롤 애니메이션이 해제된다(`src/App.css` 의 `@media print`). 파일명은 `Kyuho-Kim-Kyo-Resume` 로 제안된다.

## 배포

Vercel. `vercel.json` 참고.
