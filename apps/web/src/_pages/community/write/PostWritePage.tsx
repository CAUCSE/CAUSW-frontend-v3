import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/feed';

export const PostWritePage = () => {
  return <PostWriteModal boardGroup={BOARD_GROUP.COMMUNITY} />;
};
