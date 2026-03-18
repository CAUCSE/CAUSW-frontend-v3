'use client';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { PostHeader, usePostMenuActions } from '@/features/post';
import { ReportFlow } from '@/features/report';

import { GetPostResponseDto, PostBody, PostReactions } from '@/entities/post';

interface PostContentProps {
  post: GetPostResponseDto;
}

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

export const PostContent = ({ post }: PostContentProps) => {
  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = usePostMenuActions(post.id);

  const imageList = Array.isArray(post.fileUrlList)
    ? post.fileUrlList
    : post.fileUrlList
      ? [post.fileUrlList]
      : [];

  const isHtmlContent = HTML_TAG_PATTERN.test(post.content);

  const handleLikeClick = () => {
    // TODO: feat/#127 머지 후 useTogglePostLikeMutation으로 교체
  };

  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
        <PostHeader
          authorName={post.displayWriterNickname}
          createdAt={post.createdAt}
          avatarUrl={post.writerProfileImage ?? undefined}
          isMine={post.isOwner}
          onAction={handleMenuAction}
        />
        <PostBody
          content={post.content}
          images={imageList}
          isHtml={isHtmlContent}
        />
      </VStack>

      <PostReactions
        active={post.isPostLike}
        likeCount={post.numLike}
        onLikeClick={handleLikeClick}
      />

      <ReportFlow
        open={isReportOpen}
        setOpen={setIsReportOpen}
        onSubmitReport={submitReport}
      />

      <BlockUserModal
        open={isBlockOpen}
        setOpen={setIsBlockOpen}
        onSubmitBlock={submitBlock}
      />
    </VStack>
  );
};
