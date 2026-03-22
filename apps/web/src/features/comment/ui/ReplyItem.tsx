'use client';

import { BlockUserModal } from '@/features/block';
import {
  useCommentMenuActions,
  useToggleReplyLikeMutation,
  useDeleteReplyMutation,
} from '@/features/comment';
import { ReportFlow } from '@/features/report';

import { CommentCard, ReplyTarget, ChildComment } from '@/entities/comment';

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
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = useCommentMenuActions(reply.id);

  const { mutate: toggleLike, isPending } = useToggleReplyLikeMutation(
    postId,
    reply.id,
  );

  const { mutate: deleteReply } = useDeleteReplyMutation(postId);

  const handleLikeClick = () => {
    if (isPending || isInactive) return;
    toggleLike(!reply.isChildCommentLike);
  };

  const handleDelete = () => {
    deleteReply(reply.id);
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
        message="답글을 삭제하시겠어요?"
        onConfirm={handleDelete}
      />
    </>
  );
};
