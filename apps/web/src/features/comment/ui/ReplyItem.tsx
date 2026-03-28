'use client';

import { BlockUserModal } from '@/features/block';
import {
  COMMENT_ACTION,
  useCommentMenuActions,
  useToggleReplyLikeMutation,
} from '@/features/comment';
import { ReportFlow } from '@/features/report';

import {
  CommentCard,
  type ReplyTarget,
  type ChildComment,
} from '@/entities/comment';

import { formatRelativeTime } from '@/shared/lib';
import { ConfirmModal } from '@/shared/ui';

import { CommentActionMenu } from './CommentActionMenu';

interface ReplyItemProps {
  postId: string;
  reply: ChildComment;
  onReply: (target: ReplyTarget) => void;
}

export const ReplyItem = ({ postId, reply, onReply }: ReplyItemProps) => {
  const isInactive = reply.isDeleted || reply.isBlocked;

  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = useCommentMenuActions(postId, reply.id);

  const { mutate: toggleLike, isPending } = useToggleReplyLikeMutation(
    postId,
    reply.id,
  );

  const handleLikeClick = () => {
    if (isPending || isInactive) return;
    toggleLike(!reply.isChildCommentLike);
  };

  return (
    <>
      <CommentCard
        isReply
        author={reply.displayWriterNickname}
        profileImage={reply.writerProfileImage}
        content={reply.content}
        time={formatRelativeTime(reply.createdAt)}
        isDeleted={reply.isDeleted}
        isBlocked={reply.isBlocked}
        isLiked={reply.isChildCommentLike}
        likeCount={reply.numLike}
        onLikeClick={handleLikeClick}
        onReplyClick={() =>
          onReply({
            id: reply.id,
            author: reply.displayWriterNickname,
            content: reply.content,
          })
        }
        menuSlot={
          <CommentActionMenu
            isMine={reply.isOwner}
            onAction={handleMenuAction}
          />
        }
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
          message="답글을 삭제하시겠어요?"
          onConfirm={submitDelete}
        />
      )}
    </>
  );
};
