import { Stack } from '@causw/cds';

import { ReplyList } from './ReplyList';

import { Comment, CommentCard, ReplyTarget } from '@/entities';
import { CommentActionMenu } from '@/features';

interface CommentItemProps {
  comment: Comment;
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const CommentItem = ({
  comment,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: CommentItemProps) => {
  return (
    <Stack gap="none" key={comment.id}>
      <CommentCard
        {...comment}
        author={comment.author}
        content={comment.content}
        time={comment.time}
        onReplyClick={() =>
          onReply({
            id: comment.id,
            author: comment.author,
            content: comment.content,
          })
        }
        menuSlot={
          <CommentActionMenu
            id={comment.id}
            isMine={false}
            isOpen={activeMenuId === comment.id}
            onToggle={onToggleMenu}
            onClose={onCloseMenu}
          />
        }
      />

      <ReplyList
        replies={comment.replies}
        activeMenuId={activeMenuId}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        onReply={onReply}
      />
    </Stack>
  );
};
