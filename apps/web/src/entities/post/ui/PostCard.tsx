'use client';

import { Avatar, Comment, Heart, Menu } from '@causw/cds';

import { PostCardItem } from '../model';

const DEFAULT_AVATAR_SRC =
  'https://avatars.githubusercontent.com/u/54893898?v=4';

type PostCardProps = {
  post: PostCardItem;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center gap-2.5">
        <Avatar
          size="40"
          src={DEFAULT_AVATAR_SRC}
          fallback={<span className="text-base">👩🏻</span>}
        />

        <div className="flex min-w-0 flex-1 items-center justify-between pr-1">
          <div className="min-w-0">
            <span className="typo-subtitle-16-bold text-gray-800">
              {post.author}
            </span>
            <span className="typo-body-16-regular ml-2 text-gray-500">
              {post.timeAgo}
            </span>
          </div>
          <button type="button" aria-label="더보기">
            <Menu size={20} color="gray-500" />
          </button>
        </div>
      </div>

      <p className="typo-body-16-regular mb-4 text-gray-800">{post.content}</p>

      {post.imageCount ? (
        <div className="mb-4 flex gap-2.75 overflow-x-auto">
          {Array.from({ length: post.imageCount }).map((_, idx) => (
            <div
              key={idx}
              className="h-55 w-55 shrink-0 rounded-lg border border-gray-100 bg-white"
            />
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-1.5">
          <Heart size={16} color="gray-200" />
          <span className="typo-body-14-regular">{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Comment size={16} color="gray-200" />
          <span className="typo-body-14-regular">{post.commentCount}</span>
        </div>
      </div>
    </article>
  );
};
