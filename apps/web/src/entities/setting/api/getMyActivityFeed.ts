import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { ActivityType, MyActivityFeedPage } from '../model';

type MyActivityFeedResponseDto = {
  posts: Array<{
    postId: string;
    content: string;
    numComment: number;
    numLike: number;
    numFavorite: number;
    isAnonymous: boolean;
    voteId: string | null;
    isDeleted: boolean;
    isCrawled: boolean;
    writerNickname: string;
    writerProfileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    postImageUrls: string[];
    boardId: string;
    boardName: string;
  }>;
  nextCursor: string | null;
};

const MY_ACTIVITY_PATH: Record<ActivityType, string> = {
  'my-posts': '/api/v2/posts/me',
  'my-comments': '/api/v2/posts/me/commented',
  favorites: '/api/v2/posts/me/liked',
};

const PAGE_SIZE = 10;

export const getMyActivityFeed = async (
  activityType: ActivityType,
  cursor?: string,
): Promise<MyActivityFeedPage> => {
  const query = new URLSearchParams();

  if (cursor) {
    query.set('cursor', cursor);
  }

  query.set('size', PAGE_SIZE.toString());

  const url = withQuery(MY_ACTIVITY_PATH[activityType], query.toString());
  const data = await API.get<MyActivityFeedResponseDto>(url);

  return {
    posts: data.posts.map((post) => ({
      postId: post.postId,
      authorName: post.isAnonymous ? '익명' : post.writerNickname,
      createdAt: post.createdAt,
      content: post.content,
      likeCount: post.numLike,
      commentCount: post.numComment,
      avatarUrl: post.isAnonymous
        ? undefined
        : (post.writerProfileImageUrl ?? undefined),
      images: post.postImageUrls,
      isAnonymous: post.isAnonymous,
      boardId: post.boardId,
      boardName: post.boardName,
    })),
    nextCursor: data.nextCursor,
  };
};
