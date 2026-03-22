import { PostWriteModal } from '@/widgets/post';

export const PostEditPage = ({ postId }: { postId: string }) => {
  return <PostWriteModal postId={postId} />;
};
