import { MyFeedPage } from '@/_pages/setting';

import { type MyFeedView } from '@/entities/feed';

import { type NextSearchParams } from '@/shared/types';

export default async function Page({
  searchParams,
}: {
  searchParams: NextSearchParams<'view'>;
}) {
  const { view } = await searchParams;
  return <MyFeedPage view={view as MyFeedView} />;
}
