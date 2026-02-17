'use client';

import {
  Avatar,
  ChevronLeft,
  Comment,
  CommentColored,
  Heart,
  Menu,
} from '@causw/cds';

import { ActivityMode, ActivityPost, ActivityType } from '@/entities/setting';

const DEFAULT_AVATAR_SRC =
  'https://avatars.githubusercontent.com/u/54893898?v=4';

const TABS: Array<{ key: ActivityType; label: string }> = [
  { key: 'my-posts', label: '내가 쓴 글' },
  { key: 'my-comments', label: '댓글 단 글' },
  { key: 'favorites', label: '찜한 글' },
];

type Props = {
  activeTab: ActivityType;
  mode: ActivityMode;
  posts: ActivityPost[];
  emptyMessage: string;
  onBack: () => void;
  onTabChange: (tab: ActivityType) => void;
};

export const MyActivityModalView = ({
  activeTab,
  mode,
  posts,
  emptyMessage,
  onBack,
  onTabChange,
}: Props) => {
  return (
    <div>
      <div className="mx-auto w-full pb-6 md:px-8 md:pt-6">
        {/* TODO: 이전 버튼 구현되면 변경 */}
        <header className="flex items-center px-5 py-4">
          <button
            type="button"
            className="inline-flex items-center gap-3 text-gray-700"
            aria-label="뒤로"
            onClick={onBack}
          >
            <ChevronLeft size={18} color="gray-700" />
            <span className="typo-subtitle-16-bold">뒤로</span>
          </button>
        </header>

        <section className="px-5 py-2">
          <div className="flex gap-2">
            {TABS.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onTabChange(tab.key)}
                  className={[
                    'typo-body-14-medium rounded-sm px-3 py-2',
                    active
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-600',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {mode === 'empty' || posts.length === 0 ? (
          <section className="flex flex-col items-center justify-center px-4 py-30 md:py-35">
            <CommentColored className="text-gray-300" size={56} />
            <p className="typo-body-16-regular mt-6 text-gray-500">
              {emptyMessage}
            </p>
          </section>
        ) : (
          <section className="px-4 py-2">
            <div className="flex flex-col gap-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const PostCard = ({ post }: { post: ActivityPost }) => {
  return (
    <article className="rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center gap-2.5">
        <Avatar
          size="md"
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
