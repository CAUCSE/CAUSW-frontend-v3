export const POST_ACTION = {
  EDIT: 'edit',
  DELETE: 'delete',
  REPORT: 'report',
  BLOCK: 'block',
};

export type PostAction = (typeof POST_ACTION)[keyof typeof POST_ACTION];
