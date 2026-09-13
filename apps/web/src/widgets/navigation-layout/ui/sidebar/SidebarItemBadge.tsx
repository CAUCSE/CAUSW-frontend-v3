import { type ReactNode } from 'react';

interface SidebarItemBadgeProps {
  children: ReactNode;
}

/**
 * 사이드바 아이템 아이콘 우상단에 겹쳐 표시되는 카운트 배지.
 * 부모가 `relative`여야 하며, 한 자리 숫자는 16px 원, 그 이상은 좌우로 늘어난다.
 */
export const SidebarItemBadge = ({ children }: SidebarItemBadgeProps) => (
  <span className="typo-caption-12-semibold absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-400 px-1 text-white">
    {children}
  </span>
);
