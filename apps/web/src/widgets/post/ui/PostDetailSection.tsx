'use client';

import { useRef, useState } from 'react';

import { Stack } from '@causw/cds';

import { CommentForm } from '@/features/comment';

import { ReplyTarget, useCommentsQuery } from '@/entities/comment';
import { usePostQuery } from '@/entities/post';

import { CommentList } from './CommentList';
import { PostContent } from './PostContent';

interface PostDetailSectionProps {
  postId: string;
}

export const PostDetailSection = ({ postId }: PostDetailSectionProps) => {
  const { data: post } = usePostQuery(postId);
  const { data: comments } = useCommentsQuery({ postId });

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
        <PostContent post={post} />
        <CommentList comments={comments.content} onReply={handleReply} />
      </Stack>

      <CommentForm
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </>
  );
};
