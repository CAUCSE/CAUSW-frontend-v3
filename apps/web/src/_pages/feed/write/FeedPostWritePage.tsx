import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

export const FeedPostWritePage = () => {
  return <PostWriteModal boardGroup={BOARD_GROUP.NOTICE} />;
};
