import { MyFeedPage } from '@/_pages/setting';

import { normalizeMyFeedView } from '@/entities/feed';

import { type NextSearchParams } from '@/shared/types';

export default async function Page({
  searchParams,
}: {
  searchParams: NextSearchParams<'view'>;
}) {
  const { view } = await searchParams;
  return <MyFeedPage view={normalizeMyFeedView(view as string)} />;
}
