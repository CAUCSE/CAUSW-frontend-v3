'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BottomNavigation, mergeStyles } from '@causw/cds';

import { ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME } from '@/widgets/alumni-contacts';
import { POST_LIST_SCROLL_CONTAINER_CLASS_NAME } from '@/widgets/post-list';

import { ROUTES } from '@/shared/constants';
import { useScrollDirectionVisibility } from '@/shared/hooks';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

interface BottomNavProps {
  selected: BottomNavKey;
}

export const BottomNav = ({ selected }: BottomNavProps) => {
  // 하단 네비는 전역 컴포넌트라 페이지 이동에도 언마운트되지 않는다.
  // 두 훅을 항상 같이 켜두면, 이전 페이지에서 숨겨졌던 상태가 남아
  // 컨테이너가 없는 다른 페이지에서도 계속 숨겨진 채로 고정될 수 있어
  // 현재 경로에 해당하는 훅만 enabled로 켜고 나머지는 기본 상태로 리셋한다.
  const pathname = usePathname();
  const isPostListRoute =
    pathname === ROUTES.FEED || pathname === ROUTES.COMMUNITY;
  const isAlumniContactsRoute = pathname === ROUTES.ALUMNI_CONTACTS;

  const { isVisible: isVisibleForPostList } = useScrollDirectionVisibility({
    containerClassName: POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
    enabled: isPostListRoute,
  });
  const { isVisible: isVisibleForAlumniContactsList } =
    useScrollDirectionVisibility({
      containerClassName: ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME,
      enabled: isAlumniContactsRoute,
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
