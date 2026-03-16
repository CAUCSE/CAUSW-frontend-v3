export const MESSAGE = Object.freeze({
  PUSH_NOTIFICATION: {
    SUCCESS: '알림 설정을 허용하였습니다.',
    PERMISSION_DENIED: '알림 권한이 허용되지 않았습니다.',
    REGISTER_ERROR: '알림 토큰 등록에 실패했습니다.',
    UNKNOWN_ERROR: '알림 설정 중 오류가 발생했습니다.',
    TOKEN_UPDATE_FAILURE: '알림 토큰 등록에 실패했습니다.',
  },
} as const);
