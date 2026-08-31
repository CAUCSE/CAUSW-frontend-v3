import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

export const PostWritePage = () => {
  return <PostWriteModal boardGroup={BOARD_GROUP.NOTICE} />;
};
