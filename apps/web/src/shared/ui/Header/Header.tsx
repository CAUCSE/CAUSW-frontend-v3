'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft, splitVariantProps } from '@causw/cds';

import { header, headerKeys } from './Header.styles';
import type { HeaderProps } from './Header.types';

export function Header(props: HeaderProps) {
  const router = useRouter();

  const { title, showBackButton = true, onBackClick, ...rest } = props;

  const [variantProps, headerProps] = splitVariantProps(rest, headerKeys);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }
    router.back();
  };

  return (
    <header {...headerProps} className={header(variantProps)}>
      {showBackButton && (
        <button
          type="button"
          onClick={handleBackClick}
          aria-label="뒤로가기"
          className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors hover:bg-black/5 active:bg-black/10"
        >
          <ChevronLeft
            size="md"
            color={variantProps.tone === 'light' ? 'white' : 'gray-700'}
          />
        </button>
      )}

      {title && <h1 className="text-base font-semibold">{title}</h1>}
    </header>
  );
}
