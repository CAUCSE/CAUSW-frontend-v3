'use client';

import Link from 'next/link';

import { BottomNavigation, mergeStyles } from '@causw/cds';

import { ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME } from '@/widgets/alumni-contacts';
import { POST_LIST_SCROLL_CONTAINER_CLASS_NAME } from '@/widgets/post-list';

import { useScrollDirectionVisibility } from '@/shared/hooks';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

interface BottomNavProps {
  selected: BottomNavKey;
}

export const BottomNav = ({ selected }: BottomNavProps) => {
  // 하단 네비는 전역 컴포넌트라 여러 스크롤 컨테이너를 동시에 감시해야 함.
  // 실제 렌더된 페이지의 컨테이너만 스크롤 이벤트를 받으므로, 나머지 훅은
  // 항상 기본값(true)에 머물러 AND 연산으로 안전하게 합칠 수 있다.
  const { isVisible: isVisibleForPostList } = useScrollDirectionVisibility({
    containerClassName: POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  });
  const { isVisible: isVisibleForAlumniContactsList } =
    useScrollDirectionVisibility({
      containerClassName: ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME,
    });
  const isVisible = isVisibleForPostList && isVisibleForAlumniContactsList;

  return (
    <BottomNavigation
      selected={selected}
      className={mergeStyles(
        'transition-transform duration-300 ease-out',
        isVisible
          ? '-translate-x-1/2 translate-y-0'
          : '-translate-x-1/2 translate-y-[calc(100%+2rem)]',
      )}
    >
      {BOTTOM_NAV_ITEMS.map((item) => (
        <BottomNavigation.Item key={item.key} value={item.key} asChild>
          <Link href={item.href}>
            <BottomNavigation.Icon>{item.icon}</BottomNavigation.Icon>
            <BottomNavigation.Label>{item.label}</BottomNavigation.Label>
          </Link>
        </BottomNavigation.Item>
      ))}
    </BottomNavigation>
  );
};
