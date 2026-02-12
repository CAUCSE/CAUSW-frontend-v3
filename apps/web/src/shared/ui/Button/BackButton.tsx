'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from '@causw/cds';

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  tone?: 'light' | 'dark';
}

export function BackButton({
  label = '뒤로',
  onClick,
  tone = 'dark',
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    router.back();
  };

  const iconColor = tone === 'light' ? 'white' : 'gray-700';

  const interactionClass =
    tone === 'light'
      ? 'hover:bg-white/10 active:bg-white/20'
      : 'hover:bg-black/5 active:bg-black/10';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-2 rounded-md px-5 py-4 transition-colors ${interactionClass} `}
    >
      <ChevronLeft size="18" color={iconColor} />
      <span className="typo-subtitle-16-bold">{label}</span>
    </button>
  );
}
