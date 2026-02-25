import { cloneElement, ReactElement } from 'react';

import { HStack, mergeStyles, MonoIconProps, Text } from '@causw/cds';

interface IconCountButtonProps {
  icon: ReactElement<MonoIconProps>;
  count: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const IconCountButton = ({
  icon,
  count,
  active = false,
  disabled = false,
  onClick,
}: IconCountButtonProps) => {
  const iconColor = active ? 'red-400' : 'gray-200';
  const textColor = active ? 'red-400' : 'gray-400';

  const renderedIcon = cloneElement(icon, {
    size: 16,
    color: iconColor,
  });

  return (
    <HStack
      as="button"
      align="center"
      onClick={disabled ? undefined : onClick}
      className={mergeStyles(
        'w-fit gap-1.5 transition-opacity',
        disabled
          ? 'cursor-default'
          : 'cursor-pointer hover:opacity-70 active:opacity-70',
      )}
    >
      {renderedIcon}

      <Text typography="body-14-medium" textColor={textColor}>
        {count}
      </Text>
    </HStack>
  );
};
