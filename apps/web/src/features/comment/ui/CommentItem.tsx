'use client';

import { Stack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { ReportFlow } from '@/features/report';

import { CommentCard, ReplyTarget, Comment } from '@/entities/comment';

import { formatRelativeTime } from '@/shared/lib';
import { ConfirmModal } from '@/shared/ui';

import { COMMENT_ACTION } from '../config';
import { useCommentMenuActions, useToggleCommentLikeMutation } from '../model';

import { CommentActionMenu } from './CommentActionMenu';
import { ReplyList } from './ReplyList';

interface CommentItemProps {
  comment: Comment;
  onReply: (target: ReplyTarget) => void;
}

export const CommentItem = ({ comment, onReply }: CommentItemProps) => {
  const isInactive = comment.isDeleted || comment.isBlocked;

  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = useCommentMenuActions(comment.postId, comment.id);

  const { mutate: toggleLike } = useToggleCommentLikeMutation(
    comment.postId,
    comment.id,
  );

  const handleLikeClick = () => {
    if (isInactive) return;
    toggleLike(!comment.isCommentLike);
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

      {activeModal === COMMENT_ACTION.REPORT && (
        <ReportFlow
          open={true}
          setOpen={closeModal}
          onSubmitReport={submitReport}
        />
      )}

      {activeModal === COMMENT_ACTION.BLOCK && (
        <BlockUserModal
          open={true}
          setOpen={closeModal}
          onSubmitBlock={submitBlock}
        />
      )}

      {activeModal === COMMENT_ACTION.DELETE && (
        <ConfirmModal
          open={true}
          onOpenChange={closeModal}
          message="댓글을 삭제하시겠어요?"
          onConfirm={submitDelete}
        />
      )}
    </Stack>
  );
};
