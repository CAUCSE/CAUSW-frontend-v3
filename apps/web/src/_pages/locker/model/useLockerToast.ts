'use client';

import { useEffect, useRef, useState } from 'react';

import type { LockerToastItem, LockerToastType } from './types';

export const useLockerToast = () => {
  const [toasts, setToasts] = useState<LockerToastItem[]>([]);
  const toastTimerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const dismissToast = (toastId: string) => {
    const timer = toastTimerMapRef.current.get(toastId);
    if (timer) {
      clearTimeout(timer);
      toastTimerMapRef.current.delete(toastId);
    }

    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const showToast = (
    message: string,
    type: LockerToastType,
    duration = type === 'loading' ? Infinity : 3000,
  ) => {
    const toastId = `${Date.now()}-${Math.random()}`;

    setToasts((current) =>
      [...current, { id: toastId, message, type }].slice(-3),
    );

    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        dismissToast(toastId);
      }, duration);

      toastTimerMapRef.current.set(toastId, timer);
    }

    return toastId;
  };

  useEffect(() => {
    return () => {
      toastTimerMapRef.current.forEach((timer) => clearTimeout(timer));
      toastTimerMapRef.current.clear();
    };
  }, []);

  return {
    toasts,
    dismissToast,
    showToast,
  };
};
