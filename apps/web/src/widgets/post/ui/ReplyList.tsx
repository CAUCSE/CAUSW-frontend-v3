import { Comment, ReplyTarget } from '@/entities/comment';

import { ReplyItem } from './ReplyItem';

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
        <ReplyItem
          key={reply.id}
          reply={reply}
          activeMenuId={activeMenuId}
          onToggleMenu={onToggleMenu}
          onCloseMenu={onCloseMenu}
          onReply={onReply}
        />
      ))}
    </div>
  );
};
