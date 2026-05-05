import { PostEditPage } from '@/_pages/feed';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const resolvedParams = await params;
  return <PostEditPage postId={resolvedParams.postId} />;
}
