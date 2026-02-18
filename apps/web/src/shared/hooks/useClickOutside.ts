'use client';

import { useEffect, useRef } from 'react';

/**
 * 특정 요소(ref)의 외부 영역을 클릭했을 때 이벤트를 감지하는 커스텀 훅입니다.
 *
 * @description
 * - 드롭다운, 모달, 사이드바 등을 닫을 때 주로 사용합니다.
 * - `mousedown` 이벤트를 사용하여 클릭 시작 시점에 감지합니다 (드래그 이슈 방지).
 * - `isActive`가 false일 경우 이벤트 리스너를 부착하지 않아 성능을 최적화합니다.
 */
export const useClickOutside = (isActive: boolean, onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onClose]);

  return ref;
};
