'use client';

import { useState } from 'react';

import { Comment, CommentCard, ReplyTarget } from '@/entities';
import {
  BlockUserDialog,
  CommentAction,
  CommentActionMenu,
  ReportFlow,
} from '@/features';

interface ReplyItemProps {
  reply: Comment;
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const ReplyItem = ({
  reply,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: ReplyItemProps) => {
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
    <>
      <CommentCard
        isReply
        author={reply.author}
        content={reply.content}
        time={reply.time}
        onReplyClick={() =>
          onReply({
            id: reply.id,
            author: reply.author,
            content: reply.content,
          })
        }
        menuSlot={
          <CommentActionMenu
            id={reply.id}
            isMine={false}
            isOpen={activeMenuId === reply.id}
            onToggle={onToggleMenu}
            onClose={onCloseMenu}
            onAction={handleAction}
          />
        }
      />

      <ReportFlow
        open={isReportOpen}
        setOpen={setIsReportOpen}
        onSubmitReport={submitReport}
      />

      <BlockUserDialog
        open={isBlockOpen}
        setOpen={setIsBlockOpen}
        onSubmitBlock={submitBlock}
      />
    </>
  );
};
