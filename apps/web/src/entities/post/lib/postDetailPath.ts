import { BOARD_GROUP, type BoardGroup } from '@/entities/board';

import { ROUTES } from '@/shared/constants';

export const getPostDetailPath = (boardGroup: BoardGroup, postId: string) => {
  const encodedPostId = encodeURIComponent(postId);

  return boardGroup === BOARD_GROUP.COMMUNITY
    ? `${ROUTES.COMMUNITY}/${encodedPostId}`
    : `${ROUTES.FEED}/${encodedPostId}`;
};

export const getPostEditPath = (boardGroup: BoardGroup, postId: string) =>
  `${getPostDetailPath(boardGroup, postId)}/edit`;

export const getPostWritePath = (boardGroup: BoardGroup) =>
  boardGroup === BOARD_GROUP.COMMUNITY
    ? ROUTES.REGISTER_COMMUNITY
    : ROUTES.REGISTER_FEED;
