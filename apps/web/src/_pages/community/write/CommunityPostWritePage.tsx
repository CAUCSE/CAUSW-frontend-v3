import { PostWriteModal } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

export const CommunityPostWritePage = () => {
  return <PostWriteModal boardGroup={BOARD_GROUP.COMMUNITY} />;
};
