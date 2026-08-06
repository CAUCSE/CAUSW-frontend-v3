import { type ReactNode } from 'react';

import { Text } from '@causw/cds';

interface AlumniContactsContactActionItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export const AlumniContactsContactActionItem = ({
  icon,
  label,
  onClick,
}: AlumniContactsContactActionItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 flex-col items-center gap-1.5"
    >
      <div className="flex size-12.5 items-center justify-center rounded-md bg-gray-100">
        {icon}
      </div>
      <Text
        typography="caption-12-regular"
        textColor="gray-600"
        className="block w-full min-w-0 truncate text-center"
      >
        {label}
      </Text>
    </button>
  );
};
