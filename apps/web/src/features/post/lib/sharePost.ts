import { Share } from '@capacitor/share';

import { postShareUrl } from '@/entities/post';

import { isMobile } from '@/shared/utils';

const isShareCancelledError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') return true;

  return (
    error instanceof Error &&
    /cancelled|canceled|dismissed/i.test(error.message)
  );
};

export const sharePost = async (postId: string, title: string) => {
  const url = postShareUrl(postId);

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
      if (isShareCancelledError(error)) {
        return 'cancelled' as const;
      }
    }
  }

  await navigator.clipboard.writeText(url);
  return 'clipboard' as const;
};
