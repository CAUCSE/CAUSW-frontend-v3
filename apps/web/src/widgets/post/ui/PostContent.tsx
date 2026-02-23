import { useState } from 'react';

import { HStack, VStack } from '@causw/cds';

import { ReportFlow } from '@/widgets/report';

import { PostBody, PostHeader, PostReactions, PostVote } from '@/entities';
import { BlockUserModal, PostAction, PostActionMenu } from '@/features';

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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(3);

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const submitReport = () => {};
  const submitBlock = () => {};

  const handleAction = (action: PostAction) => {
    switch (action) {
      case 'report':
        setIsReportOpen(true);
        break;
      case 'block':
        setIsBlockOpen(true);
        break;
      case 'delete':
        console.log('게시글 삭제');
        break;
      case 'edit':
        console.log('게시글 수정');
      default:
        console.log(action);
    }
  };

  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
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
      </VStack>

      <PostVote
        options={[
          { value: 'option1', label: '짬뽕', count: 0 },
          { value: 'option2', label: '짜장면', count: 0 },
        ]}
        endTime="72시간 후 종료"
      />

      <PostReactions
        active={isLiked}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
      />

      <ReportFlow
        open={isReportOpen}
        setOpen={setIsReportOpen}
        onSubmitReport={submitReport}
      />

      <BlockUserModal
        open={isBlockOpen}
        setOpen={setIsBlockOpen}
        onSubmitBlock={submitBlock}
      />
    </VStack>
  );
};
