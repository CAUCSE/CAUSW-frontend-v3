'use client';

import { Tab } from '@causw/cds';

import { type Board } from '@/entities/board';

import { POST_LIST_TAB } from '../../config';

/**
 * 게시글 목록 상단의 칩 탭 UI
 *
 * `boards`는 이름과 달리 실제 게시판(Board) 전용이 아니라
 * {id, name} 형태로 변환 가능한 값이면 어떤 축이든 넣을 수 있다.
 * - 동문수첩 소통(community): 실제 게시판 목록을 그대로 전달해 게시판 필터로 사용
 * - 크롤링 게시글 소식(feed): PostCategory를 {id: category, name: label}로 변환해 전달해
 *   게시글 성격(카테고리) 필터로 사용 (게시판/채널 선택은 FeedChannelDropdown이 담당)
 */
interface PostBoardTabsProps {
  boards: Board[];
  value: string;
  onValueChange: (value: string) => void;
}

export const PostBoardTabs = ({
  boards,
  value,
  onValueChange,
}: PostBoardTabsProps) => {
  return (
    <Tab.Root variant="chip" value={value} onValueChange={onValueChange}>
      <Tab.List className="-mr-4 gap-1 pr-4 md:-mr-5 md:pr-5">
        <Tab.TabItem
          value={POST_LIST_TAB.ALL}
          className="typo-body-14-semibold! rounded-md px-2.5 py-1 aria-[selected=false]:text-gray-400"
        >
          전체
        </Tab.TabItem>
        {boards.map((board) => (
          <Tab.TabItem
            key={board.id}
            value={board.id}
            className="typo-body-14-semibold! rounded-md px-2.5 py-1 aria-[selected=false]:text-gray-400"
          >
            {board.name}
          </Tab.TabItem>
        ))}
      </Tab.List>
    </Tab.Root>
  );
};
