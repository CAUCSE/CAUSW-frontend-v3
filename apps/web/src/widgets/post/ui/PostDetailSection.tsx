import { useRef, useState } from 'react';

import { Stack } from '@causw/cds';

import { CommentForm } from '@/features/comment';

import { MOCK_POST_COMMENTS, ReplyTarget } from '@/entities/comment';
import { MOCK_POST } from '@/entities/post';

import { CommentList } from './CommentList';
import { PostContent } from './PostContent';

export const PostDetailSection = () => {
  const [replyTarget, setReplyTarget] = useState<ReplyTarget>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleReply = (target: ReplyTarget) => {
    setReplyTarget(target);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <Stack
        gap="none"
        className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <PostContent postId={MOCK_POST.id} />
        <CommentList comments={MOCK_POST_COMMENTS} onReply={handleReply} />
      </Stack>

      <CommentForm
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </>
  );
};
