'use client';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import {
  POST_ACTION,
  PostHeader,
  usePostMenuActions,
  useTogglePostLikeMutation,
} from '@/features/post';
import { ReportFlow } from '@/features/report';

import {
  type GetPostResponseDto,
  PostBody,
  PostReactions,
} from '@/entities/post';

import { ConfirmModal } from '@/shared/ui';

interface PostContentProps {
  post: GetPostResponseDto;
}

export const PostContent = ({ post }: PostContentProps) => {
  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = usePostMenuActions(post.id);

  const { mutate: toggleLike, isPending } = useTogglePostLikeMutation(post.id);

  const handleLikeClick = () => {
    if (isPending) return;
    toggleLike(!post.isPostLike);
  };

  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
        <PostHeader
          authorName={post.displayWriterNickname}
          createdAt={post.createdAt}
          profileImage={post.writerProfileImage}
          isOfficial={post.isOfficial}
          isMine={post.isOwner}
          onAction={handleMenuAction}
        />
        <PostBody
          content={post.content}
          images={post.fileUrlList}
          isHtml={post.isCrawled}
        />
      </VStack>

      {/* {post.voteId && (
        <PostVote options={post.vote.options} endTime={post.vote.endTime} />
      )} */}

      <PostReactions
        active={post.isPostLike}
        likeCount={post.numLike}
        onLikeClick={handleLikeClick}
      />

      <ReportFlow
        open={activeModal === POST_ACTION.REPORT}
        setOpen={closeModal}
        onSubmitReport={submitReport}
      />

      <BlockUserModal
        open={activeModal === POST_ACTION.BLOCK}
        setOpen={closeModal}
        onSubmitBlock={submitBlock}
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
