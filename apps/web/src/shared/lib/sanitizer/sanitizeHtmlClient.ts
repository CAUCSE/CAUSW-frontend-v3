import DOMPurify, { type Config } from 'dompurify';

export const sanitizeHtmlClient = (html: string, options?: Config) => {
  if (typeof window === 'undefined') return html;
  return DOMPurify.sanitize(html, options);
};
