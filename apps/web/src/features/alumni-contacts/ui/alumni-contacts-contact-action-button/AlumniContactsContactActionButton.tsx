import { type ComponentProps, type ReactNode } from 'react';

import { CTAButton, Text } from '@causw/cds';

interface AlumniContactsContactActionButtonProps {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
  color?: ComponentProps<typeof CTAButton>['color'];
  textColor?: ComponentProps<typeof Text>['textColor'];
}

export const AlumniContactsContactActionButton = ({
  icon,
  label,
  onClick,
  color = 'light',
  textColor = 'gray-500',
}: AlumniContactsContactActionButtonProps) => {
  return (
    <CTAButton
      onClick={onClick}
      color={color}
      fullWidth
      className="h-9.5 px-3 py-2"
    >
      {icon}
      <Text typography="body-14-semibold" textColor={textColor}>
        {label}
      </Text>
    </CTAButton>
  );
};
