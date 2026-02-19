import { Comment, CommentCard, ReplyTarget } from '@/entities';
import { CommentActionMenu } from '@/features';

interface ReplyListProps {
  replies: Comment[];
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const ReplyList = ({
  replies,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: ReplyListProps) => {
  if (!replies.length) return null;

  return (
    <div className="flex flex-col bg-gray-50/50">
      {replies.map((reply) => (
        <CommentCard
          key={reply.id}
          isReply
          author={reply.author}
          content={reply.content}
          time={reply.time}
          onReplyClick={() =>
            onReply({
              id: reply.id,
              author: reply.author,
              content: reply.content,
            })
          }
          menuSlot={
            <CommentActionMenu
              id={reply.id}
              isMine={false}
              isOpen={activeMenuId === reply.id}
              onToggle={onToggleMenu}
              onClose={onCloseMenu}
            />
          }
        />
      ))}
    </div>
  );
};
