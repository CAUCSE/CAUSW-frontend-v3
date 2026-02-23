'use client';

import { useState } from 'react';

import { Stack } from '@causw/cds';

import { ReportFlow } from '@/widgets/report';

import { ReplyList } from './ReplyList';

import { Comment, CommentCard, ReplyTarget } from '@/entities';
import { BlockUserModal, CommentAction, CommentActionMenu } from '@/features';

interface CommentItemProps {
  comment: Comment;
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const CommentItem = ({
  comment,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: CommentItemProps) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const submitReport = () => {};
  const submitBlock = () => {};

  const handleAction = (action: CommentAction) => {
    switch (action) {
      case 'report':
        setIsReportOpen(true);
        break;
      case 'block':
        setIsBlockOpen(true);
        break;
      case 'delete':
        console.log('댓글 삭제');
        break;
      default:
        console.log(action);
    }
  };

  return (
    <Stack gap="none" key={comment.id}>
      <CommentCard
        {...comment}
        author={comment.author}
        content={comment.content}
        time={comment.time}
        onReplyClick={() =>
          onReply({
            id: comment.id,
            author: comment.author,
            content: comment.content,
          })
        }
        menuSlot={
          <CommentActionMenu
            id={comment.id}
            isMine={false}
            isOpen={activeMenuId === comment.id}
            onToggle={onToggleMenu}
            onClose={onCloseMenu}
            onAction={handleAction}
          />
        }
      />

      <ReplyList
        replies={comment.replies}
        activeMenuId={activeMenuId}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        onReply={onReply}
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
    </Stack>
  );
};
