import { Share } from '@capacitor/share';

import { type BoardGroup } from '@/entities/feed';
import { postShareUrl } from '@/entities/post';

import { isMobile } from '@/shared/utils';

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'string') return error;

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return '';
};

const isShareCancelledError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') return true;

  return /cancelled|canceled|dismissed/i.test(getErrorMessage(error));
};

export const sharePost = async (
  boardGroup: BoardGroup,
  postId: string,
  title: string,
) => {
  const url = postShareUrl(boardGroup, postId);

  if (isMobile) {
    try {
      await Share.share({ title, url, dialogTitle: '게시글 공유' });
      return 'native' as const;
    } catch (error) {
      if (isShareCancelledError(error)) return 'cancelled' as const;
      throw error;
    }
  }

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'web-share' as const;
    } catch (error) {
      if (isShareCancelledError(error)) return 'cancelled' as const;
    }
  }

  await navigator.clipboard.writeText(url);
  return 'clipboard' as const;
};
