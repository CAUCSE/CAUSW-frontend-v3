'use client';

import { useEffect, useState } from 'react';

/**
 * 값의 변경을 지연시키는 Debounce 커스텀 훅
 * @param value 디바운싱할 값
 * @param delay 지연 시간 (밀리초 단위)
 * @returns 디바운싱된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // 사용자가 delay 시간 내에 계속 타이핑하면 이전 타이머는 취소되고 새 타이머가 설정됩니다.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // value 또는 delay가 변경될 때만 이 effect를 다시 실행합니다.
  );

  return debouncedValue;
}
