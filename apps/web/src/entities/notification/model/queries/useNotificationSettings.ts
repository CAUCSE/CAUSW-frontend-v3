import { useSuspenseQuery } from '@tanstack/react-query';

import { getNotificationSettings } from '../../api';
import { notificationQueryKeys } from '../../config';

export const useNotificationSettings = () => {
  return useSuspenseQuery({
    queryKey: notificationQueryKeys.settings(),
    queryFn: getNotificationSettings,
  });
};
