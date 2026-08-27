'use client';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import {
  POST_ACTION,
  PostHeader,
  sharePost,
  usePostMenuActions,
  useTogglePostLikeMutation,
} from '@/features/post';
import { ReportFlow } from '@/features/report';

import {
  type GetPostResponseDto,
  PostBody,
  PostReactions,
} from '@/entities/post';

import { toast } from '@/shared/model';
import { ConfirmModal } from '@/shared/ui';

interface PostContentProps {
  post: GetPostResponseDto;
  onCommentClick: () => void;
}

export const PostContent = ({ post, onCommentClick }: PostContentProps) => {
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

  const handleShareClick = () => {
    void sharePost(post.id, `${post.boardName} | CAUSW`)
      .then((result) => {
        if (result === 'clipboard') toast.success('링크가 복사되었습니다.');
      })
      .catch(() => toast.error('공유에 실패했습니다.'));
  };

  return (
    <VStack
      as="section"
      className="gap-6 border-b-1 border-gray-200 bg-white px-5 py-4 md:p-5"
    >
      <VStack gap="sm" className="border-b-1 border-gray-200 py-4">
        <PostHeader
          authorName={post.displayWriterNickname}
          profileImage={post.writerProfileImage}
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
        commentCount={post.numComment}
        viewCount={post.viewCount}
        createdAt={post.createdAt}
        onLikeClick={handleLikeClick}
        onCommentClick={onCommentClick}
        onShareClick={handleShareClick}
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
