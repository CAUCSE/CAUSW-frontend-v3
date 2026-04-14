import { type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { Comment, Heart } from '@causw/cds';

import {
  type PostAction,
  PostHeader,
  useTogglePostLikeMutation,
} from '@/features/post';

import { PostBody } from '@/entities/post';
import { type MyActivityPostItem } from '@/entities/setting';

import { IconCountButton } from '@/shared/ui';

type Props = {
  post: MyActivityPostItem;
};

export const MyActivityPostContent = ({ post }: Props) => {
  const router = useRouter();
  const { mutate: togglePostLike } = useTogglePostLikeMutation(post.postId);

  const handleAction = (_action: PostAction) => {
    // Keep the menu visible until my-feed actions are wired.
  };

  const moveToPost = () => {
    // TODO: 나중에 원본 게시판 경로로 변경
    router.push(`/feed/${post.postId}`);
  };

  const shouldPreventNavigation = (target: EventTarget | null) => {
    return (target as HTMLElement | null)?.closest(
      'button, a, [role="menuitem"]',
    );
  };

  const handleLikeClick = () => {
    togglePostLike(!post.isLiked);
  };

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldPreventNavigation(event.target)) {
      return;
    }

    moveToPost();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    if (shouldPreventNavigation(event.target)) {
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
            active={post.isLiked}
            onClick={handleLikeClick}
          />
          <IconCountButton
            icon={<Comment />}
            count={post.commentCount}
            onClick={moveToPost}
          />
        </div>
      </div>
    </article>
  );
};
