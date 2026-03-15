'use client';

import { useState } from 'react';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { PostHeader, usePostMenuActions } from '@/features/post';
import { ReportFlow } from '@/features/report';

import { GetPostResponseDto, PostBody, PostReactions } from '@/entities/post';

interface PostContentProps {
  post: GetPostResponseDto;
}

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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.numLike);

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
        <PostHeader
          authorName={post.displayWriterNickname}
          createdAt={post.createdAt}
          avatarUrl={post.writerProfileImage}
          // TODO: 작성자 이름 오른쪽 체크 표시 여부 필요
          isOfficial={post.isOwner}
          isMine={post.isOwner}
          onAction={handleMenuAction}
        />
        <PostBody
          content={post.content}
          images={post.fileUrlList}
          // isHtml={post.isHtml}
        />
      </VStack>

      {/* {post.voteId && (
        <PostVote options={post.vote.options} endTime={post.vote.endTime} />
      )} */}

      <PostReactions
        active={isLiked}
        likeCount={likeCount}
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
