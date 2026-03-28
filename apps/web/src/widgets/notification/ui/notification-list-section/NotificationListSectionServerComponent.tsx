import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { notificationQueryOptions } from '@/entities/notification';

import { NotificationListSection } from './NotificationListSection';

export const NotificationListSectionServerComponent = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      ...notificationQueryOptions.list({ isRead: false }),
    }),
    queryClient.prefetchQuery({
      ...notificationQueryOptions.list({ isRead: true }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotificationListSection />
    </HydrationBoundary>
  );
};
