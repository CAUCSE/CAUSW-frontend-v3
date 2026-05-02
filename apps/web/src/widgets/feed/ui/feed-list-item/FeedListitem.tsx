'use client';

import { useState } from 'react';

import Link from 'next/link';

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

import { ConfirmModal } from '@/shared/ui/modal';

interface FeedListitemProps {
  post: GetPostsResponseDto['posts'][number];
}

export const FeedListitem = ({ post }: FeedListitemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(true);
  };

  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = usePostMenuActions(post.postId);

  return (
    <VStack className="relative">
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
            hideActionMenu
          />
          <PostBody
            content={post.content}
            images={post.postImageUrls}
            isHtml={post.isCrawled}
            isCollapsed={!isExpanded}
            maxLines={12}
            showExpandButton={true}
            onExpand={handleExpand}
          />
          <PostFooter
            numLike={post.numLike}
            numComment={post.numComment}
            /* TODO: isPostLike props 추가 필요 */
            // isPostLike={false}
          />
        </VStack>
      </Link>
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
