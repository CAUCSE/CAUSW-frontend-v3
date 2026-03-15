import { ChildComment, ReplyTarget } from '@/entities/comment';

import { ReplyItem } from './ReplyItem';

interface ReplyListProps {
  replies: ChildComment[];
  onReply: (target: ReplyTarget) => void;
}

export const ReplyList = ({ replies, onReply }: ReplyListProps) => {
  if (!replies.length) return null;

  return (
    <div className="flex flex-col bg-gray-50/50">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} onReply={onReply} />
      ))}
    </div>
  );
};
