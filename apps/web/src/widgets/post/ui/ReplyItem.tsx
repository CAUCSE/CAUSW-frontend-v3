'use client';

import { useState } from 'react';

import { Comment, CommentCard, ReplyTarget } from '@/entities';
import {
  CommentAction,
  CommentActionMenu,
  ReportFlow,
  useReportComment,
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

  const { submitReport } = useReportComment(reply.id);

  const handleAction = (action: CommentAction) => {
    if (action === 'report') {
      setIsReportOpen(true);
    } else if (action === 'delete') {
      console.log(`대댓글 ${reply.id} 삭제`);
    } else if (action === 'block') {
      console.log(`대댓글 ${reply.id} 작성자 차단`);
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
    </>
  );
};
