import type { CeremonyItem } from '@/entities/ceremony';

// TODO: API 연결 시 제거
export const MOCK_ONGOING: CeremonyItem[] = [
  {
    id: '0',
    title: '제 1회 졸업식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-02-20',
    endDate: '2026-02-22',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];

// TODO: API 연결 시 제거
export const MOCK_UPCOMING: CeremonyItem[] = [
  {
    id: '1',
    title: '홍길동(21학번) 모 결혼식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '2',
    title: '김영희(19학번) 부 생신잔치',
    type: '경사',
    category: '생신잔치',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '3',
    title: '홍길동(21학번) 졸업식',
    type: '경사',
    category: '개업',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '4',
    title: '김범식(44학번) 딸 장례식',
    type: '조사',
    category: '장례식',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
  {
    id: '5',
    title: '김범석(55학번) 아들 돌잔치',
    type: '경사',
    category: '돌잔치',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];

// TODO: API 연결 시 제거
export const MOCK_ENDED: CeremonyItem[] = [
  {
    id: '6',
    title: '김영희(19학번) 결혼식',
    type: '경사',
    category: '결혼식',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '13:00:00',
    endTime: '15:00:00',
    state: 'ACCEPT',
  },
  {
    id: '7',
    title: '홍길동(21학번) 졸업식',
    type: '경사',
    category: '개업',
    startDate: '2026-10-10',
    endDate: '2026-10-10',
    startTime: '00:00:00',
    endTime: '23:59:00',
    state: 'ACCEPT',
  },
];
