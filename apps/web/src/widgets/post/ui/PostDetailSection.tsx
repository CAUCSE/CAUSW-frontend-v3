'use client';

import { useRef, useState } from 'react';

import { Stack, PullToRefresh } from '@causw/cds';
import { Stack, VStack } from '@causw/cds';

import { CommentForm } from '@/features/comment';

import { type ReplyTarget, useCommentsQuery } from '@/entities/comment';
import { usePostDetailSectionRefetch } from '@/entities/post';

import { useBreakpoint } from '@/shared/hooks';

import { CommentList } from './CommentList';
import { PostContent } from './PostContent';

interface PostDetailSectionProps {
  postId: string;
}

export const PostDetailSection = ({ postId }: PostDetailSectionProps) => {
  const { data: post, refetch: postRefetch } = usePostRefetch(postId);
  const { data: comments, refetch: commentsRefetch } = useCommentsRefetch({ postId });

  const { isMobileSize } = useBreakpoint();

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

      {isMobileSize && (
        <PullToRefresh
          onRefresh={async () => {
            await Promise.all([postRefetch(), commentsRefetch()]);
          }}
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
              onCommentClick={() => handleFocusCommentInput(null)}
            />
            <CommentList
              comments={comments.content}
              onReply={handleFocusCommentInput}
            />
          </Stack>
        </PullToRefresh>
      )}

      {!isMobileSize && (
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
            onCommentClick={() => handleFocusCommentInput(null)}
          />
          <CommentList
            comments={comments.content}
            onReply={handleFocusCommentInput}
          />
        </Stack>
      )}
      
      <CommentForm
        postId={postId}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </VStack>
  );
};
