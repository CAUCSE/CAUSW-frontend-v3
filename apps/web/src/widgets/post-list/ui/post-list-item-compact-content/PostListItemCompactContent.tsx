import { PostHeader, type PostAction } from '@/features/post';

import {
  PostCompactBody,
  PostFooter,
  type GetPostsResponseDto,
} from '@/entities/post';

type Post = GetPostsResponseDto['posts'][number];

interface PostListItemCompactContentProps {
  post: Post;
  onMenuAction: (action: PostAction) => void;
}

export const PostListItemCompactContent = ({
  post,
  onMenuAction,
}: PostListItemCompactContentProps) => {
  return (
    <>
      <PostHeader
        authorName={post.writerNickname}
        profileImage={post.writerProfileImage}
        isMine={post.isOwner}
        onAction={onMenuAction}
        hideActionMenu
      />
      <PostCompactBody
        title={post.title}
        content={post.content}
        images={post.postImageUrls}
        isHtml={post.isCrawled}
      />
      <PostFooter
        numLike={post.numLike}
        numComment={post.numComment}
        isPostLike={post.isPostLike}
        createdAt={post.createdAt}
        viewCount={post.viewCount}
      />
    </>
  );
};
