export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';

// TODO: 나중에 모바일 체크 로직 추가
export const isMobile = false;
