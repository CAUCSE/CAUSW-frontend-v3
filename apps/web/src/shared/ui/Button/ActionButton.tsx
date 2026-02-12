'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  tone?: 'light' | 'dark';
}

export function ActionButton({
  children,
  className = '',
  tone = 'dark',
  ...props
}: ActionButtonProps) {
  const interactionClass =
    tone === 'light'
      ? 'hover:bg-white/10 active:bg-white/20'
      : 'hover:bg-black/5 active:bg-black/10';

  return (
    <button
      type="button"
      className={`typo-subtitle-16-bold flex cursor-pointer items-center justify-center rounded-md px-5 py-4 transition-colors ${interactionClass} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
