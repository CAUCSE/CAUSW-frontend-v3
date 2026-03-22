'use client';

import { Stack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { ReportFlow } from '@/features/report';

import { CommentCard, ReplyTarget, Comment } from '@/entities/comment';

import { formatRelativeTime } from '@/shared/lib';
import { ConfirmModal } from '@/shared/ui';

import {
  useCommentMenuActions,
  useToggleCommentLikeMutation,
  useDeleteCommentMutation,
} from '../model';

import { CommentActionMenu } from './CommentActionMenu';
import { ReplyList } from './ReplyList';

interface CommentItemProps {
  comment: Comment;
  onReply: (target: ReplyTarget) => void;
}

export const CommentItem = ({ comment, onReply }: CommentItemProps) => {
  const isInactive = comment.isDeleted || comment.isBlocked;

  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = useCommentMenuActions(comment.id);

  const { mutate: toggleLike } = useToggleCommentLikeMutation(
    comment.postId,
    comment.id,
  );

  const { mutate: deleteComment } = useDeleteCommentMutation(comment.postId);

  const handleLikeClick = () => {
    if (isInactive) return;
    toggleLike(!comment.isCommentLike);
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  return (
    <Stack gap="none" key={comment.id}>
      <CommentCard
        author={comment.displayWriterNickname}
        profileImage={comment.writerProfileImage}
        content={comment.content}
        time={formatRelativeTime(comment.createdAt)}
        isDeleted={comment.isDeleted}
        isBlocked={comment.isBlocked}
        isLiked={comment.isCommentLike}
        likeCount={comment.numLike}
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

      <ReplyList
        postId={comment.postId}
        replies={comment.childCommentList}
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

      <ConfirmModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        message="댓글을 삭제하시겠어요?"
        onConfirm={handleDelete}
      />
    </Stack>
  );
};
