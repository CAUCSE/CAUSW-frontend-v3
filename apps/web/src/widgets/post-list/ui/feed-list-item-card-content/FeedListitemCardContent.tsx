import { PostHeader, type PostAction } from '@/features/post';

import {
  PostBody,
  PostFooter,
  type GetPostsResponseDto,
} from '@/entities/post';

import { FEED_CONTENT_MAX_LINE } from '../../config';

type Post = GetPostsResponseDto['posts'][number];

interface FeedListitemCardContentProps {
  post: Post;
  isExpanded: boolean;
  onExpand: () => void;
  onMenuAction: (action: PostAction) => void;
}

export const FeedListitemCardContent = ({
  post,
  isExpanded,
  onExpand,
  onMenuAction,
}: FeedListitemCardContentProps) => {
  return (
    <>
      <PostHeader
        authorName={post.writerNickname}
        profileImage={post.writerProfileImage}
        isMine={post.isOwner}
        onAction={onMenuAction}
        hideActionMenu
      />
      <PostBody
        title={post.title}
        content={post.content}
        images={post.postImageUrls}
        enableImageViewer={true}
        isHtml={post.isCrawled}
        isCollapsed={!isExpanded}
        onExpand={onExpand}
        showExpandButton
        maxLines={FEED_CONTENT_MAX_LINE}
      />
      <PostFooter
        numLike={post.numLike}
        numComment={post.numComment}
        isPostLike={post.isPostLike}
        createdAt={post.createdAt}
      />
    </>
  );
};
