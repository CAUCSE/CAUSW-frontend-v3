// 디바이스가 자동 포커스를 사용할 수 있는지 여부를 반환하는 함수
export const canUseAutoFocus = () => {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};
