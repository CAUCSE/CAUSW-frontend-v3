import { PostDetailPage } from '@/_pages/feed';

export default function Page({ params }: { params: { postId: string } }) {
  return <PostDetailPage postId={params.postId} />;
}
