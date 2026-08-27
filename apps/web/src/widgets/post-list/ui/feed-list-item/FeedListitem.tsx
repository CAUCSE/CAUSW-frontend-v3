'use client';

import { Box, VStack } from '@causw/cds';

import { BlockUserModal } from '@/features/block';
import {
  POST_ACTION,
  PostActionMenu,
  usePostMenuActions,
} from '@/features/post';
import { ReportFlow } from '@/features/report';

import {
  POST_VIEW_MODE,
  type PostViewMode,
  type GetPostsResponseDto,
} from '@/entities/post';

import { ConfirmModal } from '@/shared/ui';

import { usePostListItem } from '../../model';
import { FeedListitemCardContent } from '../feed-list-item-card-content';
import { FeedListitemCompactContent } from '../feed-list-item-compact-content';

type Post = GetPostsResponseDto['posts'][number];

interface FeedListitemProps {
  post: Post;
  viewMode?: PostViewMode;
}

export const FeedListitem = ({
  post,
  viewMode = POST_VIEW_MODE.CARD,
}: FeedListitemProps) => {
  const {
    activeModal,
    handleAction: handleMenuAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  } = usePostMenuActions(post.postId);

  const { handleCardClick, handleCardKeyDown, isExpanded, handleExpand } =
    usePostListItem();

  const isCompact = viewMode === POST_VIEW_MODE.COMPACT;

  return (
    <VStack className="relative" id={post.postId}>
      <Box
        className="cursor-pointer rounded-lg bg-white"
        role="link"
        tabIndex={0}
        onClick={(event) => handleCardClick(event, post.postId)}
        onKeyDown={(event) => handleCardKeyDown(event, post.postId)}
      >
        {isCompact ? (
          <FeedListitemCompactContent
            post={post}
            onMenuAction={handleMenuAction}
          />
        ) : (
          <FeedListitemCardContent
            post={post}
            isExpanded={isExpanded}
            onExpand={handleExpand}
            onMenuAction={handleMenuAction}
          />
        )}
      </Box>
      {/* a태그 > button태그 문제로 인해 메뉴 버튼을 따로 빼서 처리함 */}
      <div className="absolute top-0 right-0">
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
