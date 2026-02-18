import { Stack, Text } from '@causw/cds';

import { Comment, CommentCard, ReplyTarget } from '@/entities';
import { CommentActionMenu } from '@/features';

interface PostCommentListProps {
  comments: Comment[];
  activeMenuId: number | string | null;
  onToggleMenu: (id: number | string) => void;
  onCloseMenu: () => void;
  onReply: (target: ReplyTarget) => void;
}

export const PostCommentList = ({
  comments,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
  onReply,
}: PostCommentListProps) => {
  return (
    <Stack as="section" gap="none" className="flex h-fit flex-1 bg-white pt-5">
      <Stack gap="md" className="px-5">
        <div className="h-px w-full bg-gray-100 px-5" />
        <Text typography="subtitle-16-bold" textColor="gray-800">
          댓글 {comments.length}
        </Text>
      </Stack>

      {comments.map((comment) => (
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

          {comment.replies.length > 0 && (
            <div className="flex flex-col bg-gray-50/50">
              {comment.replies.map((reply) => (
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
          )}
        </Stack>
      ))}
    </Stack>
  );
};
