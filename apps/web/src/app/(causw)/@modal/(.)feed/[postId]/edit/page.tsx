import { FeedPostEditPage } from '@/_pages/feed';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const resolvedParams = await params;
  return <FeedPostEditPage postId={resolvedParams.postId} />;
}
