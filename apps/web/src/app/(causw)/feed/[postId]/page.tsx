import { PostDetailPage } from '@/_pages/feed';

const Page = ({ params }: { params: { postId: string } }) => {
  return <PostDetailPage postId={params.postId} />;
};

export default Page;
