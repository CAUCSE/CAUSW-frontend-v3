import { isMobile } from '@/shared/utils';

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: Record<
        string,
        { postMessage: (payload: unknown) => void }
      >;
    };
    CauswAppReadyBridge?: {
      notifyReady?: () => void;
    };
  }
}

let hasNotified = false;

// 구버전 앱은 핸들러가 없어 무시됨
export const notifyAppReady = () => {
  if (!isMobile || hasNotified) return;
  hasNotified = true;

  window.webkit?.messageHandlers?.causwAppReady?.postMessage({});
  window.CauswAppReadyBridge?.notifyReady?.();
};
