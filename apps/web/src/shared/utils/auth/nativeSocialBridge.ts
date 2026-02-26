import { isMobile } from '@/shared/utils';

export type SocialProvider = 'kakao' | 'apple' | 'google';

type NativeSocialLoginRequest = {
  provider: SocialProvider;
  requestId: string;
};

type NativeSocialLoginResult = {
  provider: SocialProvider;
  requestId: string;
  accessToken?: string;
  errorCode?: string;
  message?: string;
};

type PendingRequest = {
  provider: SocialProvider;
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
  timer: ReturnType<typeof setTimeout>;
};

const DEFAULT_TIMEOUT_MS = 60_000;
const pendingRequests = new Map<string, PendingRequest>();
let isBridgeHandlerInitialized = false;

declare global {
  interface Window {
    __CAUSW_ON_NATIVE_SOCIAL_LOGIN__?: (
      payload: NativeSocialLoginResult,
    ) => void;
    webkit?: {
      messageHandlers?: Record<
        string,
        { postMessage: (payload: unknown) => void }
      >;
    };
    CauswSocialLoginBridge?: {
      requestSocialLogin?: (payload: string) => void;
    };
    AndroidSocialLogin?: {
      requestSocialLogin?: (payload: string) => void;
    };
    NativeBridge?: {
      requestSocialLogin?: (payload: NativeSocialLoginRequest) => void;
    };
  }
}

const createRequestId = () =>
  `social_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const normalizeErrorMessage = (payload: NativeSocialLoginResult) => {
  if (payload.message) return payload.message;
  if (payload.errorCode)
    return `Native social login failed: ${payload.errorCode}`;
  return 'Native social login failed';
};

const resolveFromPayload = (payload: NativeSocialLoginResult) => {
  const pending = pendingRequests.get(payload.requestId);
  if (!pending) return;

  clearTimeout(pending.timer);
  pendingRequests.delete(payload.requestId);

  if (payload.provider !== pending.provider) {
    pending.reject(new Error('Social login provider mismatch.'));
    return;
  }

  if (!payload.accessToken) {
    pending.reject(new Error(normalizeErrorMessage(payload)));
    return;
  }

  pending.resolve(payload.accessToken);
};

const initializeBridgeHandler = () => {
  if (isBridgeHandlerInitialized || typeof window === 'undefined') return;

  window.__CAUSW_ON_NATIVE_SOCIAL_LOGIN__ = (payload) => {
    resolveFromPayload(payload);
  };

  window.addEventListener('causw:social-login-result', (event: Event) => {
    const customEvent = event as CustomEvent<NativeSocialLoginResult>;
    if (!customEvent.detail) return;
    resolveFromPayload(customEvent.detail);
  });

  isBridgeHandlerInitialized = true;
};

const sendToNativeBridge = (payload: NativeSocialLoginRequest): boolean => {
  if (typeof window === 'undefined') return false;

  const iosHandler =
    window.webkit?.messageHandlers?.causwSocialLogin ??
    window.webkit?.messageHandlers?.socialLogin;
  if (iosHandler) {
    iosHandler.postMessage(payload);
    return true;
  }

  if (window.CauswSocialLoginBridge?.requestSocialLogin) {
    window.CauswSocialLoginBridge.requestSocialLogin(JSON.stringify(payload));
    return true;
  }

  if (window.AndroidSocialLogin?.requestSocialLogin) {
    window.AndroidSocialLogin.requestSocialLogin(JSON.stringify(payload));
    return true;
  }

  if (window.NativeBridge?.requestSocialLogin) {
    window.NativeBridge.requestSocialLogin(payload);
    return true;
  }

  return false;
};

export const requestNativeSocialLogin = (
  provider: SocialProvider,
  timeoutMs = DEFAULT_TIMEOUT_MS,
) =>
  new Promise<string>((resolve, reject) => {
    if (!isMobile) {
      reject(new Error('Native social login is only available on mobile.'));
      return;
    }

    initializeBridgeHandler();

    const requestId = createRequestId();
    const payload: NativeSocialLoginRequest = { provider, requestId };

    const timer = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error('Native social login request timed out.'));
    }, timeoutMs);

    pendingRequests.set(requestId, {
      provider,
      resolve,
      reject,
      timer,
    });

    const sent = sendToNativeBridge(payload);
    if (!sent) {
      clearTimeout(timer);
      pendingRequests.delete(requestId);
      reject(new Error('Native social bridge is not available.'));
    }
  });
