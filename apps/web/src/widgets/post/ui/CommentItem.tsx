'use client';

import { useState } from 'react';

import { Stack } from '@causw/cds';

import { ReportFlow } from '@/widgets/report';

import { BlockUserModal } from '@/features/block';
import { CommentActionMenu, useCommentMenuActions } from '@/features/comment';

import { Comment, CommentCard, ReplyTarget } from '@/entities/comment';

import { ReplyList } from './ReplyList';

interface CommentItemProps {
  comment: Comment;
  onReply: (target: ReplyTarget) => void;
}

export const CommentItem = ({ comment, onReply }: CommentItemProps) => {
  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = useCommentMenuActions(comment.id);

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
    <Stack gap="none" key={comment.id}>
      <CommentCard
        {...comment}
        author={comment.author}
        content={comment.content}
        time={comment.time}
        isLiked={isLiked}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
        onReplyClick={() =>
          onReply({
            id: comment.id,
            author: comment.author,
            content: comment.content,
          })
        }
        menuSlot={
          <CommentActionMenu isMine={false} onAction={handleMenuAction} />
        }
      />

      <ReplyList replies={comment.replies} onReply={onReply} />

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
