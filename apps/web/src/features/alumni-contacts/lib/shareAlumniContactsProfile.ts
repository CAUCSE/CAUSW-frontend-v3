import { Share } from '@capacitor/share';

import { alumniContactsShareUrl } from '@/entities/alumni-contacts';

import { isMobile } from '@/shared/utils';

const isShareCancelledError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') return true;

  return (
    error instanceof Error &&
    /cancelled|canceled|dismissed/i.test(error.message)
  );
};

export const shareAlumniContactsProfile = async (
  alumniContactsId: string,
  name: string,
) => {
  const url = alumniContactsShareUrl(alumniContactsId);
  const title = `${name}님의 동문수첩 프로필`;

  if (isMobile) {
    try {
      await Share.share({ title, url, dialogTitle: '프로필 공유' });
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
