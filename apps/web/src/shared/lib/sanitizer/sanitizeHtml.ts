import type { Config } from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

/**
 * 위험한 태그/속성만 제거하고 나머지 HTML 구조는 유지 (innerHTML로 렌더링할 때 사용)
 */
export const sanitizeHtml = (html: string, options?: Config) => {
  return DOMPurify.sanitize(html, options) as string;
};

/**
 * 모든 태그를 제거하고 텍스트만 남김 (일반 텍스트로 렌더링할 때 사용)
 */
export const stripHtml = (html: string) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] }) as string;
};
