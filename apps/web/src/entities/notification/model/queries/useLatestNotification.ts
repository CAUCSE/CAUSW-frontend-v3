import { useQuery } from '@tanstack/react-query';

import { notificationQueryOptions } from '../../config';

export const useLatestNotification = () => {
  return useQuery(notificationQueryOptions.latest());
};
