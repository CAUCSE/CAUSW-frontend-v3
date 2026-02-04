'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from '@causw/cds';

import { splitVariantProps } from '@/shared/lib/splitVariantProps';

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
          className="flex items-center justify-center p-1"
        >
          <ChevronLeft
            size="18"
            color={variantProps.tone === 'light' ? 'white' : 'gray-700'}
          />
        </button>
      )}

      {title && <h1 className="text-base font-semibold">{title}</h1>}
    </header>
  );
}
