import { type ActivityType } from './types';

export const EMPTY_ACTIVITY_MESSAGE: Record<ActivityType, string> = {
  'my-posts': '내가 쓴 글이 없어요',
  'my-comments': '댓글 단 글이 없어요',
  favorites: '찜한 글이 없어요',
};
