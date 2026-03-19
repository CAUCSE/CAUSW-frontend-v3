import type { ReactNode } from 'react';

import {
  ErrorColored,
  LoadingColored,
  SuccessColored,
  mergeStyles,
} from '@causw/cds';

import type { LockerToastItem, LockerToastType } from '../model';

export const LockerToastStack = ({
  className,
  onDismiss,
  toasts,
}: {
  className?: string;
  onDismiss: (id: string) => void;
  toasts: LockerToastItem[];
}) => {
  if (toasts.length === 0) return null;

  const iconMap: Record<LockerToastType, ReactNode> = {
    success: <SuccessColored size={20} />,
    error: <ErrorColored size={20} />,
    loading: <LoadingColored size={20} className="animate-spin" />,
  };

  return (
    <div
      className={mergeStyles(
        'pointer-events-none flex w-full flex-col gap-2',
        className,
      )}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          aria-live="assertive"
          className={mergeStyles(
            'pointer-events-auto flex w-full items-center justify-center gap-2 rounded-md bg-gray-700 px-0 py-3',
            'text-gray-0 text-center text-base leading-[160%] font-medium tracking-[-0.02rem]',
          )}
          onClick={() => onDismiss(toast.id)}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {iconMap[toast.type]}
          </span>
          <span className="min-w-0 break-words">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
