'use client';

import { FloatingActionButton, mergeStyles } from '@causw/cds';

const ArrowUp = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.96501 16.2001V4.18101L2.50613 9.27691C2.08823 9.66661 1.43355 9.6437 1.04363 9.22594C0.653818 8.80804 0.676796 8.15339 1.09461 7.76344L8.29461 1.04332L8.37107 0.97828C8.76789 0.673801 9.33329 0.695587 9.70613 1.04332L16.9061 7.76344C17.3239 8.15339 17.3469 8.80804 16.9571 9.22594C16.5672 9.64371 15.9125 9.66661 15.4946 9.27691L10.0357 4.18101V16.2001C10.0357 16.7717 9.57198 17.2354 9.00037 17.2354C8.42875 17.2354 7.96501 16.7717 7.96501 16.2001Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface ScrollTopButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ScrollTopButton = ({
  onClick,
  className,
}: ScrollTopButtonProps) => {
  return (
    <FloatingActionButton
      className={mergeStyles(
        'shadow-blur absolute bottom-4 size-11.5 border-gray-200 bg-gray-50 p-3.5 text-gray-500 hover:border-gray-300 hover:bg-gray-200 md:right-8 md:bottom-12',
        className,
      )}
      onClick={onClick}
    >
      <ArrowUp />
    </FloatingActionButton>
  );
};
