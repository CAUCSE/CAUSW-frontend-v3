import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

export const CommunityPostEditPage = ({ postId }: { postId: string }) => {
  return <PostWriteModal postId={postId} boardGroup={BOARD_GROUP.COMMUNITY} />;
};
