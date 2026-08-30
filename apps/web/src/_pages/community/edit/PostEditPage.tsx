import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/feed';

export const PostEditPage = ({ postId }: { postId: string }) => {
  return <PostWriteModal postId={postId} boardGroup={BOARD_GROUP.COMMUNITY} />;
};
