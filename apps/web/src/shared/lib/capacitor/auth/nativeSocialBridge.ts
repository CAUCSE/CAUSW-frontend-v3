import { isAndroid, isMobile } from '@/shared/utils';

export type SocialProvider = 'kakao' | 'apple' | 'google';

type NativeSocialLoginRequest = {
  provider: SocialProvider;
  requestId: string;
};

type NativeSocialLoginResult = {
  provider: SocialProvider;
  requestId: string;
  accessToken?: string;
  idToken?: string;
  errorCode?: string;
  message?: string;
};

type NativeSocialLoginToken = {
  accessToken?: string;
  idToken?: string;
};

type PendingRequest = {
  provider: SocialProvider;
  resolve: (value: NativeSocialLoginToken) => void;
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
  const errorCode = payload.errorCode ?? '';
  const rawMessage = payload.message ?? '';
  const normalized = `${errorCode} ${rawMessage}`.toLowerCase();

  if (
    normalized.includes('cancel') ||
    normalized.includes('canceled') ||
    normalized.includes('cancelled') ||
    normalized.includes('user_cancel') ||
    normalized.includes('user canceled') ||
    normalized.includes('사용자 취소') ||
    normalized.includes('취소')
  ) {
    return '로그인이 취소되었습니다.';
  }

  if (normalized.includes('10:') || normalized.includes('developer_error')) {
    return '구글 로그인 설정이 올바르지 않습니다. 잠시 후 다시 시도해 주세요.';
  }

  if (normalized.includes('timeout')) {
    return '로그인 시간이 초과되었습니다. 다시 시도해 주세요.';
  }

  if (
    normalized.includes('network') ||
    normalized.includes('offline') ||
    normalized.includes('connection')
  ) {
    return '네트워크 연결이 불안정합니다. 다시 시도해 주세요.';
  }

  if (errorCode === 'UNSUPPORTED_PROVIDER') {
    return '지원하지 않는 로그인 방식입니다.';
  }

  if (errorCode === 'INVALID_PAYLOAD') {
    return '로그인 요청 형식이 올바르지 않습니다. 다시 시도해 주세요.';
  }

  if (errorCode === 'GOOGLE_CLIENT_ID_MISSING') {
    return '구글 로그인 설정값이 누락되었습니다. 관리자에게 문의해 주세요.';
  }

  if (errorCode === 'PRESENTING_VIEW_CONTROLLER_MISSING') {
    return '로그인 화면을 표시할 수 없습니다. 앱을 다시 실행해 주세요.';
  }

  if (errorCode === 'APPLE_LOGIN_UNAVAILABLE') {
    return '현재 기기에서는 Apple 로그인을 사용할 수 없습니다.';
  }

  if (errorCode === 'APPLE_LOGIN_UNSUPPORTED') {
    return '현재 기기에서는 Apple 로그인을 사용할 수 없습니다.';
  }

  if (errorCode === 'KAKAO_LOGIN_ACCOUNT_REQUIRED') {
    return '카카오톡 계정이 연결되어 있지 않습니다. 카카오 계정으로 로그인해 주세요.';
  }

  if (
    errorCode === 'KAKAO_LOGIN_FAILED' ||
    errorCode === 'GOOGLE_LOGIN_FAILED' ||
    errorCode === 'APPLE_LOGIN_FAILED'
  ) {
    return '소셜 로그인에 실패했습니다. 다시 시도해 주세요.';
  }

  if (
    errorCode === 'EMPTY_ACCESS_TOKEN' ||
    errorCode === 'EMPTY_ID_TOKEN' ||
    errorCode === 'APPLE_CREDENTIAL_MISSING'
  ) {
    return '로그인 정보를 가져오지 못했습니다. 다시 시도해 주세요.';
  }

  return '소셜 로그인에 실패했습니다. 다시 시도해 주세요.';
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

  if (!payload.accessToken && !payload.idToken) {
    pending.reject(new Error(normalizeErrorMessage(payload)));
    return;
  }

  pending.resolve({
    accessToken: payload.accessToken,
    idToken: payload.idToken,
  });
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

const validateProvider = (provider: SocialProvider) => {
  if (provider === 'apple' && isAndroid) {
    return '현재 기기에서는 Apple 로그인을 사용할 수 없습니다.';
  }
  return null;
};

export const requestNativeSocialLogin = (
  provider: SocialProvider,
  timeoutMs = DEFAULT_TIMEOUT_MS,
) =>
  new Promise<NativeSocialLoginToken>((resolve, reject) => {
    if (!isMobile) {
      reject(new Error('모바일 환경에서만 소셜 로그인을 사용할 수 있습니다.'));
      return;
    }

    const validationError = validateProvider(provider);
    if (validationError) {
      reject(new Error(validationError));
      return;
    }

    initializeBridgeHandler();

    const requestId = createRequestId();
    const payload: NativeSocialLoginRequest = { provider, requestId };

    const timer = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error('로그인 시간이 초과되었습니다. 다시 시도해 주세요.'));
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
      reject(
        new Error('앱 로그인 연결에 실패했습니다. 앱을 다시 실행해 주세요.'),
      );
    }
  });
