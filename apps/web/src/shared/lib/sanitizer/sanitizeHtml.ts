import type { Config } from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeHtml = (html: string, options?: Config) => {
  return DOMPurify.sanitize(html, options) as string;
};
