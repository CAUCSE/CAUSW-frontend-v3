import { Post } from './types';

export const MOCK_IMAGES = [
  'https://picsum.photos/seed/openlab1/1200/800',
  'https://picsum.photos/seed/openlab2/1200/800',
  'https://picsum.photos/seed/openlab3/1200/800',
  'https://picsum.photos/seed/openlab4/1200/800',
];

export const MOCK_POST: Post = {
  id: 1,
  author: {
    name: '소프트웨어학부',
    profileImage: 'https://picsum.photos/seed/profile1/200/200',
    isOfficial: true,
  },
  createdAt: '2024-01-26T18:40:40.643Z',
  content: `[2025 크자회의 날 식사 행사 선배 초청 안내]

안녕하세요, 선배님.
중앙대학교 제53대 소프트웨어학부 학생회장 허민호, 제5대 AI학과 학생회장 권준상입니다.
항상 학부와 후배들에게 보내주신 따뜻한 관심과 애정에 진심으로 감사드립니다.

오는 11월 1일(토), 올해로 세번째를 맞이하는 동문회 최대 연례 행사인 크자회의 날이 개최됩니다.
크자회의 날은 재학생과 선배님이 함께 지식과 경험을 나누는 교류의 장으로 ...`,
  images: MOCK_IMAGES,
  likeCount: 3,
  isLiked: false,
  vote: {
    options: [
      { value: 'option1', label: '참석한다', count: 10 },
      { value: 'option2', label: '참석 못한다', count: 3 },
    ],
    endTime: '2026-03-26T18:40:40.643Z',
  },
};
