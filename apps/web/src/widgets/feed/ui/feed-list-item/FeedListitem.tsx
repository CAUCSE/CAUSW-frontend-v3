'use client';

import { type KeyboardEvent, type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import {
  POST_ACTION,
  PostActionMenu,
  PostHeader,
  usePostMenuActions,
} from '@/features/post';
import { ReportFlow } from '@/features/report';

import {
  PostBody,
  PostFooter,
  type GetPostsResponseDto,
} from '@/entities/post';

interface FeedListitemProps {
  post: GetPostsResponseDto['posts'][number];
}

export const FeedListitem = ({ post }: FeedListitemProps) => {
  const router = useRouter();

  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
  } = usePostMenuActions(post.postId);

  const moveToPost = () => {
    router.push(`/feed/${post.postId}`);
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    moveToPost();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      moveToPost();
    }
  };

  return (
    <VStack className="relative">
      <VStack
        gap="sm"
        className="cursor-pointer rounded-lg bg-white p-4"
        role="link"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
      >
        <PostHeader
          authorName={post.writerNickname}
          createdAt={post.createdAt}
          profileImage={post.writerProfileImage}
          isOfficial={post.isOfficial}
          isMine={post.isOwner}
          onAction={handleMenuAction}
          hideActionMenu
        />
        <PostBody
          content={post.content}
          images={post.postImageUrls}
          enableImageViewer={false}
          isHtml={post.isCrawled}
        />
        <PostFooter
          numLike={post.numLike}
          numComment={post.numComment}
          isPostLike={post.isPostLike}
        />
      </VStack>
      {/* a태그 > button태그 문제로 인해 메뉴 버튼을 따로 빼서 처리함 */}
      <div className="absolute top-6.5 right-5">
        <PostActionMenu isMine={post.isOwner} onAction={handleMenuAction} />
      </div>
      <BlockUserModal
        open={activeModal === POST_ACTION.BLOCK}
        setOpen={closeModal}
        onSubmitBlock={submitBlock}
      />
      <ReportFlow
        open={activeModal === POST_ACTION.REPORT}
        setOpen={closeModal}
        onSubmitReport={submitReport}
      />
    </VStack>
  );
};
