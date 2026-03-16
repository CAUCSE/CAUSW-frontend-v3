'use client';

import { BlockUserModal } from '@/features/block';
import {
  useCommentMenuActions,
  useToggleReplyLikeMutation,
} from '@/features/comment';
import { ReportFlow } from '@/features/report';

import { CommentCard, ReplyTarget, ChildComment } from '@/entities/comment';

import { formatRelativeTime } from '@/shared/lib';

import { CommentActionMenu } from './CommentActionMenu';

interface ReplyItemProps {
  postId: string;
  reply: ChildComment;
  onReply: (target: ReplyTarget) => void;
}

export const ReplyItem = ({ postId, reply, onReply }: ReplyItemProps) => {
  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = useCommentMenuActions(reply.id);

  const { mutate: toggleLike, isPending } = useToggleReplyLikeMutation(
    postId,
    reply.id,
  );

  const handleLikeClick = () => {
    if (isPending) return;
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
    </>
  );
};
