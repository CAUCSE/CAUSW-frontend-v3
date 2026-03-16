import { PushNotifications } from '@capacitor/push-notifications';

import { MESSAGE } from '@/shared/constants';
import { toast } from '@/shared/model';
import { getNativeFCM, setNativeFCM } from '@/shared/storage';
import { isWeb } from '@/shared/utils';

import { useUpdateFCMToken } from '../mutations/useUpdateFCMToken';
//TODO : main에 올리기 전에 console 제거하기
export const usePushNotification = () => {
  const updateFCMTokenMutation = useUpdateFCMToken();

  const compareFCMToken = async (): Promise<void> => {
    try {
      if (isWeb) return;

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();

        if (permStatus.receive !== 'granted') {
          toast.error(MESSAGE.PUSH_NOTIFICATION.PERMISSION_DENIED);
          return;
        }
      }

      if (permStatus.receive !== 'granted') {
        return;
      }

      const registrationListener = await PushNotifications.addListener(
        'registration',
        async ({ value }) => {
          try {
            const clientFCMToken = value;
            const localFCMToken = await getNativeFCM();

            if (localFCMToken === clientFCMToken) {
              return;
            }

            await updateFCMTokenMutation.mutateAsync({
              fcmToken: clientFCMToken,
            });

            await setNativeFCM(clientFCMToken);
            toast.success(MESSAGE.PUSH_NOTIFICATION.SUCCESS);
          } catch (error) {
            console.log('[PN] registration handler error', error);
            toast.error(MESSAGE.PUSH_NOTIFICATION.REGISTER_ERROR);
          } finally {
            await registrationListener.remove();
            await registrationErrorListener.remove();
          }
        },
      );

      const registrationErrorListener = await PushNotifications.addListener(
        'registrationError',
        async (err) => {
          console.log('[PN] registrationError', err);
          toast.error(MESSAGE.PUSH_NOTIFICATION.REGISTER_ERROR);

          await registrationListener.remove();
          await registrationErrorListener.remove();
        },
      );

      await PushNotifications.register();
    } catch (error) {
      console.log('[PN] compareFCMToken error', error);
      toast.error(MESSAGE.PUSH_NOTIFICATION.UNKNOWN_ERROR);
    }
  };

  return {
    compareFCMToken,
  };
};
