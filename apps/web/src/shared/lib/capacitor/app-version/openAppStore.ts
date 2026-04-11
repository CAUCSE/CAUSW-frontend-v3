import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';

export async function openAppStore({
  appUrl,
  webUrl,
}: {
  appUrl: string;
  webUrl: string;
}) {
  if (!appUrl && !webUrl) return;

  try {
    if (appUrl) {
      const { completed } = await AppLauncher.openUrl({
        url: appUrl,
      });

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
    console.error('[openStore] Browser.open failed', browserError);
  }

  if (typeof window !== 'undefined' && webUrl) {
    window.location.href = webUrl;
  }
}
