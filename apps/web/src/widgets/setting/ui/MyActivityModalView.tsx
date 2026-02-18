'use client';

import { CommentColored } from '@causw/cds';

import { PostCard, PostCardItem } from '@/entities/post';
import { ActivityMode, ActivityType } from '@/entities/setting';

import { ActionHeader } from '@/shared';

const TABS: Array<{ key: ActivityType; label: string }> = [
  { key: 'my-posts', label: '내가 쓴 글' },
  { key: 'my-comments', label: '댓글 단 글' },
  { key: 'favorites', label: '찜한 글' },
];

type Props = {
  activeTab: ActivityType;
  mode: ActivityMode;
  posts: PostCardItem[];
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
        <ActionHeader
          isSticky={false}
          background="transparent"
          buttonColor="gray"
        >
          <ActionHeader.BackButton onClick={onBack}>
            뒤로
          </ActionHeader.BackButton>
          <div />
        </ActionHeader>

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
