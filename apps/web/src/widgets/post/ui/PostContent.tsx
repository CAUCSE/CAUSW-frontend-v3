'use client';

import { useState } from 'react';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { PostHeader, usePostMenuActions } from '@/features/post';
import { ReportFlow } from '@/features/report';

import { MOCK_POST, PostBody, PostReactions, PostVote } from '@/entities/post';

interface PostContentProps {
  postId: string | number;
}

export const PostContent = ({ postId }: PostContentProps) => {
  const {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction: handleMenuAction,
    submitReport,
    submitBlock,
  } = usePostMenuActions(postId);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(MOCK_POST.likeCount);

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
          authorName={MOCK_POST.author.name}
          createdAt={MOCK_POST.createdAt}
          avatarUrl={MOCK_POST.author.profileImage}
          isOfficial={MOCK_POST.author.isOfficial}
          isMine={false}
          onAction={handleMenuAction}
        />
        <PostBody content={MOCK_POST.content} images={MOCK_POST.images} />
      </VStack>

      {MOCK_POST.vote && (
        <PostVote
          options={MOCK_POST.vote.options}
          endTime={MOCK_POST.vote.endTime}
        />
      )}

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
