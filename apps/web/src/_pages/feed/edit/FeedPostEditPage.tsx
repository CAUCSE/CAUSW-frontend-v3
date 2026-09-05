import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

export const FeedPostEditPage = ({ postId }: { postId: string }) => {
  return <PostWriteModal postId={postId} boardGroup={BOARD_GROUP.NOTICE} />;
};
