export const MOCK_POST_COMMENTS = [
  {
    id: 1,
    author: '가나디',
    content: '오늘 점심 메뉴 추천 좀',
    time: '8분 전',
    isAuthor: false,
    replies: [
      {
        id: 3,
        author: '가나디',
        content: '오늘 점심 메뉴 추천 좀',
        time: '8분 전',
        isAuthor: true,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: '익명',
    content: '오픈랩 신청 날짜가 정확히 언제인가요?',
    time: '방금',
    isAuthor: false,
    replies: [],
  },
];
