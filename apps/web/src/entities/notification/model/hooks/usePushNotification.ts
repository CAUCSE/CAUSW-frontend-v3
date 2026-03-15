import { PushNotifications } from '@capacitor/push-notifications';

import { MESSAGE } from '@/shared/constants';
import { toast } from '@/shared/model';
import { getNativeFCM, setNativeFCM } from '@/shared/storage';
import { isWeb } from '@/shared/utils';

import { useUpdateFCMToken } from '../mutations/useUpdateFCMToken';

export const usePushNotification = () => {
  const updateFCMTokenMutation = useUpdateFCMToken(true);

  const extendFCMTokenMutation = useUpdateFCMToken(false);

  const compareFCMToken = async (): Promise<void> => {
    try {
      if (isWeb) {
        return;
      }

      const permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        await PushNotifications.requestPermissions();
      }

      PushNotifications.addListener('registration', async ({ value }) => {
        const clientFCMToken = value;

        const localFCMToken = await getNativeFCM();

        if (localFCMToken !== clientFCMToken) {
          updateFCMTokenMutation.mutate({
            fcmToken: clientFCMToken,
          });

          await setNativeFCM(clientFCMToken);
        } else {
          extendFCMTokenMutation.mutate({
            fcmToken: clientFCMToken,
          });
        }
      });

      PushNotifications.addListener('registrationError', (err) => {
        console.log('[PN] registrationError', err);
        toast.error('11111111');
        toast.error(MESSAGE.PUSH_NOTIFIACTION_FAILURE);
      });

      await PushNotifications.register();
    } catch (_error) {
      toast.error(MESSAGE.PUSH_NOTIFIACTION_ERROR);
    }
  };

  return {
    compareFCMToken,
  };
};
