'use client';

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

import { ConfirmModal } from '@/shared/ui';

import { usePostListItem } from '../../model';

interface FeedListitemProps {
  post: GetPostsResponseDto['posts'][number];
}

export const FeedListitem = ({ post }: FeedListitemProps) => {
  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = usePostMenuActions(post.postId);

  const { handleCardClick, handleCardKeyDown, authorName } =
    usePostListItem(post);

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
          authorName={authorName}
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
      <ConfirmModal
        title="게시글을 삭제하시겠어요?"
        open={activeModal === POST_ACTION.DELETE}
        onOpenChange={closeModal}
        onConfirm={submitDelete}
        confirmText="삭제하기"
        titleTypo="subtitle-16-bold"
        confirmColor="red"
      />
    </VStack>
  );
};
