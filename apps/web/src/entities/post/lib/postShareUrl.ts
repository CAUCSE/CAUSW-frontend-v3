import { type BoardGroup } from '@/entities/feed';

import { getPostDetailPath } from './postDetailPath';

const getWebOrigin = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL;
  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      return null;
    }
  }

  return typeof window === 'undefined' ? null : window.location.origin;
};

export const postShareUrl = (boardGroup: BoardGroup, postId: string) => {
  const path = getPostDetailPath(boardGroup, postId);
  const origin = getWebOrigin();

  return origin ? new URL(path, origin).toString() : path;
};
