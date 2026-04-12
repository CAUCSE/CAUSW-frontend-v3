import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';

import { toast } from '@/shared/model';

export async function openAppStore({
  appUrl,
  webUrl,
}: {
  appUrl: string;
  webUrl: string;
}) {
  if (!appUrl && !webUrl) {
    toast.error('업데이트 경로를 찾을 수 없어요.');
    return;
  }

  try {
    if (appUrl) {
      const { completed } = await AppLauncher.openUrl({
        url: appUrl,
      });
      //TODO : prod올리기 전에 삭제
      console.log(
        '[openStore] AppLauncher result',
        JSON.stringify({
          url: appUrl,
          completed,
        }),
      );

      if (completed) return;
    }
  } catch (launcherError) {
    console.error('[openStore] AppLauncher.openUrl failed', launcherError);
  }

  try {
    if (webUrl) {
      //TODO : prod올리기 전에 삭제
      console.log(
        '[openStore] fallback to Browser.open',
        JSON.stringify({
          url: webUrl,
        }),
      );

      await Browser.open({
        url: webUrl,
      });
      return;
    }
  } catch (browserError) {
    console.log('[openStore] Browser.open failed', browserError);
  }

  try {
    if (typeof window !== 'undefined' && webUrl) {
      window.location.href = webUrl;
      return;
    }
  } catch {}

  toast.error('스토어를 열 수 없어요. 잠시 후 다시 시도해주세요.');
}
