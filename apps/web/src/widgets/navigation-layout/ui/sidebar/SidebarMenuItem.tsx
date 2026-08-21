import Link from 'next/link';

import { StatusDot } from '@/shared/ui';

import { type SidebarItem } from '../../model';

export function SidebarMenuItem({
  item,
  selected = false,
  showDot = false,
}: {
  item: SidebarItem;
  selected?: boolean;
  showDot?: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={selected ? 'page' : undefined}
      className={`group flex w-11 flex-col items-center gap-1 rounded-md py-1 text-center transition-colors ${
        selected
          ? 'text-gray-700'
          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700 active:bg-gray-50'
      }`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current">
        {showDot && <StatusDot show right={-2} top={-2} />}
        {item.icon}
      </span>
      <span className="typo-caption-12-semibold leading-none">
        {item.label}
      </span>
    </Link>
  );
}
