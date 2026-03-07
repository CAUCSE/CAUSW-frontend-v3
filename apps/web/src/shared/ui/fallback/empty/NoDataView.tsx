import type { ComponentProps } from 'react';

import { mergeStyles, Text, VStack, CommentColored } from '@causw/cds';

type TextTypography = ComponentProps<typeof Text>['typography'];
type TextColor = ComponentProps<typeof Text>['textColor'];

interface NoDataViewProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  gapClassName?: string;
  typography?: TextTypography;
  textColor?: TextColor;
  children?: React.ReactNode;
}

interface NoDataViewIconProps {
  children?: React.ReactNode;
  className?: string;
}

interface NoDataViewMessageProps extends ComponentProps<typeof Text> {
  children?: React.ReactNode;
}

function NoDataViewIcon({ children, className }: NoDataViewIconProps) {
  return (
    <div className={className}>
      {children || <CommentColored className="text-gray-300" size={56} />}
    </div>
  );
}

function NoDataViewMessage({
  children,
  typography = 'body-14-medium',
  textColor = 'gray-400',
  className,
}: NoDataViewMessageProps) {
  return (
    <Text typography={typography} textColor={textColor} className={className}>
      {children || '불러올 데이터가 없어요'}
    </Text>
  );
}

function NoDataViewRoot({
  message,
  icon,
  children,
  className,
  gapClassName = 'gap-[0.375rem]',
  typography = 'body-14-medium',
  textColor = 'gray-400',
}: NoDataViewProps) {
  const hasChildren = children !== undefined;

  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className={mergeStyles('h-full w-full rounded-lg p-5', className)}
    >
      <VStack
        align="center"
        justify="center"
        className={mergeStyles('w-full', gapClassName)}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            <NoDataViewIcon>{icon}</NoDataViewIcon>
            <NoDataViewMessage typography={typography} textColor={textColor}>
              {message}
            </NoDataViewMessage>
          </>
        )}
      </VStack>
    </VStack>
  );
}

export const NoDataView = Object.assign(NoDataViewRoot, {
  Icon: NoDataViewIcon,
  Message: NoDataViewMessage,
});
