'use client';

import { useRef, useState } from 'react';

import { Stack, PullToRefresh } from '@causw/cds';

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
  const { data: post, refetch } = usePostDetailSectionRefetch(postId);
  const { data: comments } = useCommentsQuery({ postId });

  const { isMobileSize } = useBreakpoint();

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
      {isMobileSize && (
        <PullToRefresh
          onRefresh={async () => {
            await refetch();
          }}
        >
          <Stack
            gap="none"
            className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <PostContent post={post} />
            <CommentList
              countComment={post.numComment}
              comments={comments.content}
              onReply={handleReply}
            />
          </Stack>
        </PullToRefresh>
      )}

      {!isMobileSize && (
        <Stack
          gap="none"
          className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <PostContent post={post} />
          <CommentList
            countComment={post.numComment}
            comments={comments.content}
            onReply={handleReply}
          />
        </Stack>
      )}

      <CommentForm
        postId={postId}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </>
  );
};
