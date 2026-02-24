import { useState } from 'react';

import { VStack } from '@causw/cds';

import { ReportFlow } from '@/widgets/report';

import { BlockUserModal } from '@/features/block';
import { PostHeader, usePostMenuActions } from '@/features/post';

import { PostBody, PostReactions, PostVote } from '@/entities/post';

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
  const [likeCount, setLikeCount] = useState(3);

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
          authorName="소프트웨어학부"
          createdAt="8분 전"
          isOfficial={true}
          isMine={false}
          onAction={handleMenuAction}
        />
        <PostBody />
      </VStack>

      <PostVote
        options={[
          { value: 'option1', label: '짬뽕', count: 0 },
          { value: 'option2', label: '짜장면', count: 0 },
        ]}
        endTime="72시간 후 종료"
      />

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
