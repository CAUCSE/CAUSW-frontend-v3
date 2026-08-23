'use client';

import { useEffect } from 'react';

import { useEventCallback } from './useEventCallback';

type NativeBackHandler = () => boolean;
type NativeBackGuardConfirm = () => void;

declare global {
  interface Window {
    __androidBackHandler?: NativeBackHandler;
    __nativeBackGuardConfirm?: NativeBackGuardConfirm;
  }
}

interface UseNativeBackGuardParams {
  enabled?: boolean;
  guardKey: string;
  onBackAttempt: () => void;
  onConfirmBack?: () => void;
}

const getHistoryState = () => {
  const state = window.history.state;

  if (!state || typeof state !== 'object') {
    return {};
  }

  return state as Record<string, unknown>;
};

export const confirmNativeBackGuard = (fallback: () => void) => {
  if (typeof window !== 'undefined' && window.__nativeBackGuardConfirm) {
    window.__nativeBackGuardConfirm();
    return;
  }

  fallback();
};

export const useNativeBackGuard = ({
  enabled = true,
  guardKey,
  onBackAttempt,
  onConfirmBack,
}: UseNativeBackGuardParams) => {
  const handleBackAttempt = useEventCallback(onBackAttempt);
  const handleConfirmBack = useEventCallback(
    onConfirmBack ?? (() => window.history.back()),
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const allowBackRef = { current: false };

    if (!getHistoryState()[guardKey]) {
      window.history.pushState(
        {
          ...getHistoryState(),
          [guardKey]: true,
        },
        '',
        window.location.href,
      );
    }

    const handleBrowserBack = () => {
      if (allowBackRef.current) {
        allowBackRef.current = false;
        return;
      }

      window.history.pushState(
        {
          ...getHistoryState(),
          [guardKey]: true,
        },
        '',
        window.location.href,
      );

      handleBackAttempt();
    };

    const handleAndroidBack: NativeBackHandler = () => {
      handleBackAttempt();
      return true;
    };

    const handleConfirm: NativeBackGuardConfirm = () => {
      allowBackRef.current = true;
      handleConfirmBack();
    };

    window.__androidBackHandler = handleAndroidBack;
    window.__nativeBackGuardConfirm = handleConfirm;
    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);

      if (window.__androidBackHandler === handleAndroidBack) {
        delete window.__androidBackHandler;
      }

      if (window.__nativeBackGuardConfirm === handleConfirm) {
        delete window.__nativeBackGuardConfirm;
      }
    };
  }, [enabled, guardKey, handleBackAttempt, handleConfirmBack]);
};
