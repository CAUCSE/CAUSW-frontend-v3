import { useState } from 'react';

import { HStack, Stack } from '@causw/cds';

import { PostBody, PostHeader, PostReactions, PostVote } from '@/entities';
import {
  BlockUserDialog,
  PostAction,
  PostActionMenu,
  ReportFlow,
  useReportPost,
} from '@/features';

interface PostContentProps {
  postId: number | string;
  activeMenuId: number | string | null;
  onToggleMenu: (id: string | number) => void;
  onCloseMenu: () => void;
}

export const PostContent = ({
  postId,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
}: PostContentProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const { submitReport } = useReportPost(postId);

  const handleAction = (action: PostAction) => {
    switch (action) {
      case 'report':
        setIsReportOpen(true);
        break;
      case 'block':
        setIsBlockOpen(true);
        break;
      default:
        console.log(action);
    }
  };

  return (
    <Stack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <Stack gap="sm">
        <HStack as="header" align="center" justify="between">
          <PostHeader />
          <PostActionMenu
            id={postId}
            isMine={false}
            isOpen={activeMenuId === 'post-header'}
            onToggle={onToggleMenu}
            onClose={onCloseMenu}
            onAction={handleAction}
          />
        </HStack>
        <PostBody />
      </Stack>

      <PostVote
        options={[
          { value: 'option1', label: '짬뽕', count: 0 },
          { value: 'option2', label: '짜장면', count: 0 },
        ]}
        endTime="72시간 후 종료"
      />

      <PostReactions
        liked={true}
        likeCount={3}
        onLikeClick={() => {}}
        onShareClick={() => {}}
      />

      <ReportFlow
        open={isReportOpen}
        setOpen={setIsReportOpen}
        onSubmitReport={submitReport}
      />

      <BlockUserDialog open={isBlockOpen} setOpen={setIsBlockOpen} userId={3} />
    </Stack>
  );
};
