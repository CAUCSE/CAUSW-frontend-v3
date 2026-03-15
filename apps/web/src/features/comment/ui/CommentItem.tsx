'use client';

import { useState } from 'react';

import { Stack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { ReportFlow } from '@/features/report';

import { CommentCard, ReplyTarget, Comment } from '@/entities/comment';

import { formatRelativeTime } from '@/shared/lib';

import { useCommentMenuActions } from '../model';

import { CommentActionMenu } from './CommentActionMenu';
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
        author={comment.displayWriterNickname}
        profileImage={comment.writerProfileImage}
        content={comment.content}
        time={formatRelativeTime(comment.createdAt)}
        isLiked={isLiked}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
        onReplyClick={() =>
          onReply({
            id: comment.id,
            author: comment.displayWriterNickname,
            content: comment.content,
          })
        }
        menuSlot={
          <CommentActionMenu
            isMine={comment.isOwner}
            onAction={handleMenuAction}
          />
        }
      />

      <ReplyList replies={comment.childCommentList} onReply={onReply} />

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
