'use client';

import { Comment, Heart, VStack } from '@causw/cds';

import type { FeedSearchPost } from '@/widgets/feed/model';

import { PostHeader } from '@/features/post';

import { PostBody } from '@/entities/post';

import { IconCountButton } from '@/shared/ui';

type FeedSearchResultCardProps = {
  post: FeedSearchPost;
  onClick: () => void;
};

export const FeedSearchResultCard = ({
  post,
  onClick,
}: FeedSearchResultCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className="w-full rounded-lg bg-white p-4 text-left transition-colors hover:bg-gray-50"
    >
      <VStack gap="md" className="items-stretch">
        <PostHeader
          authorName={post.author}
          createdAt={post.createdAt}
          avatarUrl={post.avatarUrl}
          isMine={false}
          onAction={() => {}}
        />

        <PostBody
          content={post.content}
          isHtml={post.isHtml}
          isCollapsed
          maxLines={2}
          showExpandButton
          onExpand={onClick}
        />

        <div className="flex items-center gap-5">
          <IconCountButton icon={<Heart />} count={post.likeCount} disabled />
          <IconCountButton
            icon={<Comment />}
            count={post.commentCount}
            disabled
          />
        </div>
      </VStack>
    </div>
  );
};
