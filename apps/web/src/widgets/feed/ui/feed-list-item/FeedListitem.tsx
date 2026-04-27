'use client';

import Link from 'next/link';

import { VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import { POST_ACTION, PostHeader, usePostMenuActions } from '@/features/post';
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
  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
  } = usePostMenuActions(post.postId);

  return (
    <>
      <Link href={`/feed/${post.postId}`}>
        <VStack key={post.postId} gap="sm" className="rounded-lg bg-white p-4">
          <PostHeader
            authorName={post.writerNickname}
            createdAt={post.createdAt}
            profileImage={post.writerProfileImage}
            // TODO: 작성자 이름 오른쪽 체크 표시 여부 필요
            // isOfficial={}
            isMine={post.isOwner}
            onAction={handleMenuAction}
          />
          <PostBody
            content={post.content}
            images={post.postImageUrls}
            isHtml={post.isCrawled}
          />
          <PostFooter
            numLike={post.numLike}
            numComment={post.numComment}
            /* TODO: isPostLike props 추가 필요 */
            // isPostLike={false}
          />
        </VStack>
      </Link>
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
    </>
  );
};
