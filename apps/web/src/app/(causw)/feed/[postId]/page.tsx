import { FeedPostDetailPage } from '@/_pages/feed';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <FeedPostDetailPage postId={postId} />;
}
