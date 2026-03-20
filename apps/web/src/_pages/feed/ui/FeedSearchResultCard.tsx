'use client';

import { Comment, Heart, VStack } from '@causw/cds';

import { PostHeader } from '@/features/post';

import { PostBody } from '@/entities/post';

import { IconCountButton } from '@/shared/ui';

import type { FeedSearchPost } from '@/_pages/feed/feed-page.helpers';

type FeedSearchResultCardProps = {
  post: FeedSearchPost;
  onClick: () => void;
};

export const FeedSearchResultCard = ({
  post,
  onClick,
}: FeedSearchResultCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
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

        <PostBody content={post.content} isCollapsed maxLines={2} />

        <div className="flex items-center gap-5">
          <IconCountButton icon={<Heart />} count={post.likeCount} disabled />
          <IconCountButton
            icon={<Comment />}
            count={post.commentCount}
            disabled
          />
        </div>
      </VStack>
    </button>
  );
};
