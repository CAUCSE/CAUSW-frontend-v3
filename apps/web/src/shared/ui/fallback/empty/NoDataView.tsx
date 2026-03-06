import type { ComponentProps } from 'react';

import { mergeStyles, Spacer, Text, VStack, CommentColored } from '@causw/cds';

type TextTypography = ComponentProps<typeof Text>['typography'];
type TextColor = ComponentProps<typeof Text>['textColor'];

interface NoDataViewProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  typography?: TextTypography;
  textColor?: TextColor;
}

export function NoDataView({
  message,
  icon,
  className,
  typography = 'body-14-medium',
  textColor = 'gray-400',
}: NoDataViewProps) {
  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className={mergeStyles('h-full w-full p-5', className)}
    >
      {icon || <CommentColored className="text-gray-300" size={56} />}
      <Spacer size={6} />
      <Text typography={typography} textColor={textColor}>
        {message || '불러올 데이터가 없어요'}
      </Text>
    </VStack>
  );
}
