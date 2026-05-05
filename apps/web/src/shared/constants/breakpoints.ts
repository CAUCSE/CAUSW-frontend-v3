export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
} as const;

export const MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1199px)',
  desktop: '(min-width: 1200px)',
} as const;
