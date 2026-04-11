export const COMMENT_ACTION = {
  DELETE: 'delete',
  REPORT: 'report',
  BLOCK: 'block',
} as const;

export type CommentAction =
  (typeof COMMENT_ACTION)[keyof typeof COMMENT_ACTION];
