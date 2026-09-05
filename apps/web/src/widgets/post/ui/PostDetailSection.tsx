'use client';

import { useRef, useState } from 'react';

import { Stack, VStack } from '@causw/cds';

import { CommentForm } from '@/features/comment';

import { type BoardGroup } from '@/entities/board';
import { type ReplyTarget, useCommentsQuery } from '@/entities/comment';
import { usePostQuery } from '@/entities/post';

import { CommentList } from './CommentList';
import { PostContent } from './PostContent';

interface PostDetailSectionProps {
  postId: string;
  boardGroup: BoardGroup;
}

export const PostDetailSection = ({
  postId,
  boardGroup,
}: PostDetailSectionProps) => {
  const { data: post } = usePostQuery(postId);
  const { data: comments } = useCommentsQuery({ postId });

  const [replyTarget, setReplyTarget] = useState<ReplyTarget>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFocusCommentInput = (target: ReplyTarget) => {
    setReplyTarget(target);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <VStack
      gap="none"
      className="min-h-0 flex-1 overflow-hidden bg-white md:rounded-[1rem] md:border md:border-gray-200 md:pt-5"
    >
      <Stack
        gap="none"
        className="min-h-0 flex-1 overflow-scroll [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <PostContent
          post={post}
          boardGroup={boardGroup}
          onCommentClick={() => handleFocusCommentInput(null)}
        />
        <CommentList
          comments={comments.content}
          onReply={handleFocusCommentInput}
        />
      </Stack>

      <CommentForm
        postId={postId}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </VStack>
  );
};
