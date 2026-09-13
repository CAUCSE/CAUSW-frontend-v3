export const INACTIVE_MESSAGE = {
  deleted: '삭제된 댓글이에요.',
  blocked: '차단한 사용자가 작성한 내용이에요.',
} as const;

export const UNKNOWN_AUTHOR = '알 수 없음';

/**
 * TODO: 백엔드가 탈퇴 유저 여부를 별도 필드로 내려주면 닉네임 문자열 비교 대신 그 필드를 쓰도록 교체할 것.
 * 현재는 CommentAuthorInfo.java가 탈퇴/추방 유저의 displayWriterNickname을 이 고정 문자열로 치환해서 내려주는 것에 의존함.
 */
export const BACKEND_INACTIVE_WRITER_NICKNAME = '비활성 유저';
export const WITHDRAWN_AUTHOR_DISPLAY_NAME = '탈퇴한 사용자';
