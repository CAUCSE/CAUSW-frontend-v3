import { useSuspenseQuery } from '@tanstack/react-query';

import { getNotificationSettings } from '../../api';
import { notificationQueryKey } from '../../config';

export const useNotificationSettings = () => {
  return useSuspenseQuery({
    queryKey: notificationQueryKey.settings(),
    queryFn: getNotificationSettings,
  });
};
