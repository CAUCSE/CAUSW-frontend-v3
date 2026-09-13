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

import { type BoardGroup } from '@/entities/board';
import {
  type GetPostResponseDto,
  PostBody,
  PostOriginalLinkAndAttachedFiles,
  PostReactions,
} from '@/entities/post';

import { toast } from '@/shared/model';
import { ConfirmModal } from '@/shared/ui';

interface PostContentProps {
  post: GetPostResponseDto;
  boardGroup: BoardGroup;
  onCommentClick: () => void;
}

export const PostContent = ({
  post,
  boardGroup,
  onCommentClick,
}: PostContentProps) => {
  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = usePostMenuActions(post.id, boardGroup);

  const { mutate: toggleLike, isPending } = useTogglePostLikeMutation(post.id);

  const handleLikeClick = () => {
    if (isPending) return;
    toggleLike(!post.isPostLike);
  };

  const handleShareClick = () => {
    void sharePost(boardGroup, post.id, `${post.boardName} | CAUSW`)
      .then((result) => {
        if (result === 'clipboard') toast.success('링크가 복사되었습니다.');
      })
      .catch(() => toast.error('공유에 실패했습니다.'));
  };

  return (
    <VStack
      as="section"
      className="gap-4 border-b-1 border-gray-100 bg-white px-5 pb-4"
    >
      <VStack gap="none">
        <PostHeader
          authorName={post.displayWriterNickname}
          profileImage={post.writerProfileImage}
          isMine={post.isOwner}
          onAction={handleMenuAction}
        />
        <PostBody
          title={post.title}
          content={post.content}
          images={post.fileUrlList}
          isHtml={post.isCrawled}
        />
        <PostOriginalLinkAndAttachedFiles
          originalWriter={post.displayWriterNickname}
          originalUrl={post.originalNoticeUrl}
          attachedFiles={post.crawledAttachments}
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
