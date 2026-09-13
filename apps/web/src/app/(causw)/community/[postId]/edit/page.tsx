import { CommunityPostEditPage } from '@/_pages/community';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const resolvedParams = await params;
  return <CommunityPostEditPage postId={resolvedParams.postId} />;
}
