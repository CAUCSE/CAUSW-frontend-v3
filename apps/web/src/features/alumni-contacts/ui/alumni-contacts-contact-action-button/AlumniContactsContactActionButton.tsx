import { type ReactNode } from 'react';

import { Button, Text } from '@causw/cds';

interface AlumniContactsContactActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export const AlumniContactsContactActionButton = ({
  icon,
  label,
  onClick,
}: AlumniContactsContactActionButtonProps) => {
  return (
    <Button onClick={onClick}>
      {icon}
      <Text typography="body-14-semibold" textColor="gray-500">
        {label}
      </Text>
    </Button>
  );
};
