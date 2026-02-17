import {
  ActivityMode,
  ActivityPost,
  ActivityType,
  MyActivityFeed,
} from '../model';

const LIST_POSTS: ActivityPost[] = [
  {
    id: 1,
    author: '가나다',
    timeAgo: '8분 전',
    content: '오늘 점심 메뉴 추천 좀',
    likeCount: 3,
    commentCount: 3,
  },
  {
    id: 2,
    author: '길동82',
    timeAgo: '8분 전',
    content: '오늘 학교에서 무슨 행사 하나여?',
    likeCount: 3,
    commentCount: 3,
    imageCount: 3,
  },
  {
    id: 3,
    author: '길동82',
    timeAgo: '8분 전',
    content: '오늘 학교에서 무슨 행사 하나여?',
    likeCount: 3,
    commentCount: 3,
  },
];

const EMPTY_MESSAGE: Record<ActivityType, string> = {
  'my-posts': '내가 쓴 글이 없어요',
  'my-comments': '댓글 단 글이 없어요',
  favorites: '찜한 글이 없어요',
};

export const getMyActivityFeed = async (
  activityType: ActivityType,
  mode: ActivityMode,
): Promise<MyActivityFeed> => {
  await new Promise((resolve) => setTimeout(resolve, 120));

  return {
    emptyMessage: EMPTY_MESSAGE[activityType],
    posts: mode === 'empty' ? [] : LIST_POSTS,
  };
};
