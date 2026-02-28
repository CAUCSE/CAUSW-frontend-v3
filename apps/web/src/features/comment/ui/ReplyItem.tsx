'use client';

import { useState } from 'react';

import { BlockUserModal } from '@/features/block';
import { useCommentMenuActions } from '@/features/comment';
import { ReportFlow } from '@/features/report';

import { Comment, CommentCard, ReplyTarget } from '@/entities/comment';

import { CommentActionMenu } from './CommentActionMenu';

interface ReplyItemProps {
  reply: Comment;
  onReply: (target: ReplyTarget) => void;
}

export const ReplyItem = ({ reply, onReply }: ReplyItemProps) => {
  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = useCommentMenuActions(reply.id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <CommentCard
        isReply
        author={reply.author}
        content={reply.content}
        time={reply.time}
        isLiked={isLiked}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
        onReplyClick={() =>
          onReply({
            id: reply.id,
            author: reply.author,
            content: reply.content,
          })
        }
        menuSlot={
          <CommentActionMenu isMine={false} onAction={handleMenuAction} />
        }
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
    </>
  );
};
