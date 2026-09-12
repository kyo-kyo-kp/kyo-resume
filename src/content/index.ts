/**
 * 사이트 콘텐츠의 단일 진입점. ko 가 원본, en 은 번역본이며 같은 SiteContent 타입을 공유한다.
 *
 * 공개 범위 규칙 (docs/private/REBUILD_PLAN_2026.md 5절 요약):
 * - 숫자는 카드 제목·헤드라인에 쓰지 않는다. 각주(evidence)에만, 상대 표현으로.
 * - 플랫폼 규모는 회사가 공개한 수치 또는 자릿수 표현만, 문제 맥락에서 한 번만.
 * - 사내 시스템·계정·CI 도구 이름, 테이블명, 동료 이름, 내부 URL, 비즈니스 수치, 로드맵 일정은 쓰지 않는다.
 * - 계획 중인 것은 "설계했다"까지만.
 */
import { Locale, SiteContent } from '../types/content';
import { ko } from './ko';
import { en } from './en';

export type { Locale, SiteContent } from '../types/content';

export const content: Record<Locale, SiteContent> = { ko, en };

export const DEFAULT_LOCALE: Locale = 'ko';

export function getContent(locale: Locale = DEFAULT_LOCALE): SiteContent {
  return content[locale];
}
