import { Stack } from '@causw/cds';

import { CommentItem } from './CommentItem';

import { Comment, CommentHeader, ReplyTarget } from '@/entities';

interface CommentListProps {
  comments: Comment[];
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const CommentList = ({
  comments,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: CommentListProps) => {
  return (
    <Stack as="section" gap="none" className="flex h-fit flex-1 bg-white pt-5">
      <CommentHeader count={comments.length} />

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          activeMenuId={activeMenuId}
          onToggleMenu={onToggleMenu}
          onCloseMenu={onCloseMenu}
          onReply={onReply}
        />
      ))}
    </Stack>
  );
};
