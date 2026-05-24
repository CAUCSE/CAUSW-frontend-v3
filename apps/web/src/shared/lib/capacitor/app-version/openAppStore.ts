import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';

import { ERRMSG } from '@/shared/constants';
import { toast } from '@/shared/model';

export async function openAppStore({
  appUrl,
  webUrl,
}: {
  appUrl: string;
  webUrl: string;
}) {
  if (!appUrl && !webUrl) {
    toast.error(ERRMSG.NOT_FOUND_APPSTORE_URL);
    return;
  }

  try {
    if (appUrl) {
      const { completed } = await AppLauncher.openUrl({
        url: appUrl,
      });

      if (completed) return;
    }
  } catch {}

  try {
    if (webUrl) {
      await Browser.open({
        url: webUrl,
      });
      return;
    }
  } catch {}

  try {
    if (typeof window !== 'undefined' && webUrl) {
      window.location.href = webUrl;
      return;
    }
  } catch {}

  toast.error(ERRMSG.FAIL_APPSTORE_OPEN);
}
