'use client';

import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react';

import { useClickOutside } from '../hooks';

type DropdownDirection = 'bottom' | 'top';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  trigger: ReactNode;
}

export const DropdownMenu = ({
  isOpen,
  onClose,
  onToggle,
  trigger,
  children,
}: PropsWithChildren<DropdownMenuProps>) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useClickOutside(isOpen, onClose);
  const [direction, setDirection] = useState<DropdownDirection>('bottom');

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const MENU_HEIGHT = 160;
      const SAFE_AREA = 20;

      if (spaceBelow < MENU_HEIGHT + SAFE_AREA) {
        setDirection('top');
      } else {
        setDirection('bottom');
      }
    }
    onToggle();
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div ref={buttonRef} onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`z-dropdown absolute right-0 rounded-md bg-white shadow-[0_0_30px_0_rgba(51,53,61,0.3)] ${
            direction === 'top'
              ? 'bottom-full mb-1.5 origin-bottom-right'
              : 'top-full mt-1.5 origin-top-right'
          } `}
        >
          {children}
        </div>
      )}
    </div>
  );
};
