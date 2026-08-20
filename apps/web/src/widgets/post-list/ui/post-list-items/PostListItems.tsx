import { Separator } from '@causw/cds';

import { type FeedViewMode } from '@/entities/feed';
import { type GetPostsResponseDto } from '@/entities/post';

import { FeedListitem } from '../feed-list-item';

interface PostListItemsProps {
  posts: GetPostsResponseDto['posts'];
  viewMode: FeedViewMode;
  /** 마지막 아이템을 제외하고 아이템 사이에 넣을 Separator의 className (미지정 시 Separator 기본 스타일) */
  separatorClassName?: string;
}

/**
 * 게시글 리스트의 <li> 아이템 + 아이템 사이 구분선을 렌더링하는 공용 컴포넌트
 * 화면마다 다른 <ul> 래퍼 스타일은 각 리스트 컴포넌트가 그대로 소유한다.
 */
export const PostListItems = ({
  posts,
  viewMode,
  separatorClassName,
}: PostListItemsProps) => {
  return (
    <>
      {posts.map((post, index) => (
        <li key={post.postId}>
          <FeedListitem post={post} viewMode={viewMode} />
          {index < posts.length - 1 && (
            <Separator
              orientation="horizontal"
              className={separatorClassName}
            />
          )}
        </li>
      ))}
    </>
  );
};
