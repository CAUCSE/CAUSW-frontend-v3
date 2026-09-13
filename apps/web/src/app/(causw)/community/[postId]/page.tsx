import { CommunityPostDetailPage } from '@/_pages/community';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <CommunityPostDetailPage postId={postId} />;
}
