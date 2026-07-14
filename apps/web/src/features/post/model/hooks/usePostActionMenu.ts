'use client';

import { type MouseEvent, type PointerEvent, useRef, useState } from 'react';

const DRAG_THRESHOLD = 8;

export const usePostActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const shouldHandlePointerClickRef = useRef(false);
  const shouldIgnorePointerClickRef = useRef(false);

  const resetPointerInfo = () => {
    pointerPosRef.current = null;
    shouldHandlePointerClickRef.current = false;
    shouldIgnorePointerClickRef.current = false;
  };

  // Radix Dropdown Trigger가 pointerdown 시점에 바로 열리는 기본 동작을 막고,
  // 이후 click 시점에 실제 탭인지 드래그인지 판별할 수 있도록 시작 좌표를 저장합니다.
  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
    pointerPosRef.current = { x: event.clientX, y: event.clientY };
    shouldHandlePointerClickRef.current = true;
    shouldIgnorePointerClickRef.current = false;
  };

  // pointerdown 이후 포인터가 일정 거리 이상 움직이면 스크롤/드래그 제스처로 간주합니다.
  const handlePointerMove = (event: PointerEvent) => {
    if (!pointerPosRef.current) {
      return;
    }

    const deltaX = Math.abs(event.clientX - pointerPosRef.current.x);
    const deltaY = Math.abs(event.clientY - pointerPosRef.current.y);

    if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
      shouldIgnorePointerClickRef.current = true;
    }
  };

  // 드래그가 아닌 일반 탭/클릭으로 판단될 때만 메뉴를 열거나 닫습니다.
  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!shouldHandlePointerClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (!shouldIgnorePointerClickRef.current) {
      setIsOpen((prev) => !prev);
    }

    resetPointerInfo();
  };

  // pointercancel은 스크롤 제스처로 이어질 수 있어 이후 click이 발생하더라도 무시합니다.
  const handlePointerCancel = () => {
    pointerPosRef.current = null;
    shouldIgnorePointerClickRef.current = true;
  };

  // pointerup 이후에도 click에서 드래그 여부를 확인해야 하므로 시작 좌표만 먼저 비웁니다.
  const handlePointerUp = () => {
    pointerPosRef.current = null;
  };

  return {
    isOpen,
    setIsOpen,
    handlePointerDown,
    handlePointerMove,
    handleTriggerClick,
    handlePointerCancel,
    handlePointerUp,
  };
};
