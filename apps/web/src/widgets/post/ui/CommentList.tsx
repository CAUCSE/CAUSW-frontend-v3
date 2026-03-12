import { Stack } from '@causw/cds';

import { CommentItem } from '@/features/comment';

import { Comment, CommentHeader, ReplyTarget } from '@/entities/comment';

interface CommentListProps {
  comments: Comment[];
  onReply: (target: ReplyTarget) => void;
}

export const CommentList = ({ comments, onReply }: CommentListProps) => {
  return (
    <Stack as="section" gap="none" className="flex h-fit flex-1 bg-white pt-5">
      <CommentHeader count={comments.length} />

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </Stack>
  );
};
