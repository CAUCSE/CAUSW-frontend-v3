'use client';

import type { RefObject } from 'react';

import type { FeedSearchPost } from '@/widgets/feed/model';

import { FeedSearchResultCard } from './FeedSearchResultCard';

type SearchResultsSectionProps = {
  posts: FeedSearchPost[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadingMessage: string;
  targetRef: RefObject<HTMLDivElement | null>;
  onPostClick: (postId: FeedSearchPost['id']) => void;
};

export const SearchResultsSection = ({
  posts,
  hasNextPage,
  isFetchingNextPage,
  loadingMessage,
  targetRef,
  onPostClick,
}: SearchResultsSectionProps) => {
  return (
    <section className="py-4">
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <FeedSearchResultCard
            key={post.id}
            post={post}
            onClick={() => onPostClick(post.id)}
          />
        ))}

        {hasNextPage ? <div ref={targetRef} className="h-4 w-full" /> : null}

        {isFetchingNextPage ? (
          <div className="py-4 text-center">
            <p className="typo-body-14-regular text-gray-400">
              {loadingMessage}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
