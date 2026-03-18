import { KeyboardEvent, MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { Comment, Heart } from '@causw/cds';

import { PostAction, PostHeader } from '@/features/post';

import { PostBody } from '@/entities/post';
import { MyActivityPostItem } from '@/entities/setting';

import { IconCountButton } from '@/shared/ui';

type Props = {
  post: MyActivityPostItem;
};

export const MyActivityPostContent = ({ post }: Props) => {
  const router = useRouter();

  const handleAction = (_action: PostAction) => {
    // Keep the menu visible until my-feed actions are wired.
  };

  const moveToPost = () => {
    // TODO: 나중에 원본 게시판 경로로 변경
    router.push(`/feed/${post.postId}`);
  };

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('button, a, [role="menuitem"]')) {
      return;
    }

    moveToPost();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('button, a, [role="menuitem"]')) {
      return;
    }

    event.preventDefault();
    moveToPost();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="overflow-hidden rounded-2xl bg-white p-4 transition-opacity hover:opacity-95"
    >
      <div className="flex flex-col gap-4">
        <PostHeader
          authorName={post.authorName}
          createdAt={post.createdAt}
          avatarUrl={post.avatarUrl}
          isOfficial={post.isOfficial}
          isMine={true}
          onAction={handleAction}
        />

        <PostBody content={post.content} images={post.images} />

        <div className="flex items-center gap-5">
          <IconCountButton
            icon={<Heart />}
            count={post.likeCount}
            disabled={true}
          />
          <IconCountButton
            icon={<Comment />}
            count={post.commentCount}
            disabled={true}
          />
        </div>
      </div>
    </article>
  );
};
