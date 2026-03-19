'use client';

import { useEffect, useRef, useState } from 'react';

import {
  useExtendLockerMutation,
  useRegisterLockerMutation,
  useReturnLockerMutation,
} from '@/entities/locker';

import { extractErrorMessage } from '@/shared/utils';

import type { LockerToastItem, LockerToastType } from './types';

type UseLockerControlParams = {
  currentLockerId: string | null;
  selectedLockerId: string | null;
  onCompleted: () => void;
};

export const useLockerControl = ({
  currentLockerId,
  selectedLockerId,
  onCompleted,
}: UseLockerControlParams) => {
  const [toasts, setToasts] = useState<LockerToastItem[]>([]);
  const toastTimerMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const registerLockerMutation = useRegisterLockerMutation();
  const returnLockerMutation = useReturnLockerMutation();
  const extendLockerMutation = useExtendLockerMutation();

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

  const handleApply = async () => {
    if (!selectedLockerId) {
      showToast('신청할 사물함을 선택해 주세요.', 'error');
      return;
    }

    const loadingToastId = showToast(
      '사물함 등록 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await registerLockerMutation.mutateAsync(selectedLockerId);
      dismissToast(loadingToastId);
      showToast('사물함 등록이 완료되었습니다.', 'success');
      onCompleted();
    } catch (error) {
      dismissToast(loadingToastId);
      showToast(
        extractErrorMessage(error, '사물함 등록에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleReturn = async () => {
    if (!currentLockerId) return;

    const loadingToastId = showToast(
      '사물함 반납 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await returnLockerMutation.mutateAsync(currentLockerId);
      dismissToast(loadingToastId);
      showToast('사물함 반납이 완료되었습니다.', 'success');
      onCompleted();
    } catch (error) {
      dismissToast(loadingToastId);
      showToast(
        extractErrorMessage(error, '사물함 반납에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleExtend = async () => {
    if (!currentLockerId) return;

    const loadingToastId = showToast(
      '사물함 연장 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await extendLockerMutation.mutateAsync(currentLockerId);
      dismissToast(loadingToastId);
      showToast('사물함 연장이 완료되었습니다.', 'success');
      onCompleted();
    } catch (error) {
      dismissToast(loadingToastId);
      showToast(
        extractErrorMessage(error, '사물함 연장에 실패했습니다.'),
        'error',
      );
    }
  };

  return {
    dismissToast,
    handleApply,
    handleExtend,
    handleReturn,
    isPending:
      registerLockerMutation.isPending ||
      returnLockerMutation.isPending ||
      extendLockerMutation.isPending,
    toasts,
  };
};
