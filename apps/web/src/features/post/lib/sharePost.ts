import { Share } from '@capacitor/share';

import { postShareUrl } from '@/shared/lib';
import { isMobile } from '@/shared/utils';

export const sharePost = async (postId: string, title: string) => {
  const url = postShareUrl(postId);

  if (isMobile) {
    await Share.share({ title, url, dialogTitle: '게시글 공유' });
    return 'native' as const;
  }

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'web-share' as const;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'cancelled' as const;
      }
    }
  }

  await navigator.clipboard.writeText(url);
  return 'clipboard' as const;
};
