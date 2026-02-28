import { ComponentProps } from 'react';

import { Text } from '@causw/cds';

import { COPY } from '@/shared/constants';

interface CalendarTitleProps {
  typography: ComponentProps<typeof Text>['typography'];
  month: number;
  className?: string;
}

export function CalendarTitle({
  typography,
  month,
  className,
}: CalendarTitleProps) {
  return (
    <Text typography={typography} textColor="blue-700" className={className}>
      {month}월{' '}
      <Text typography={typography} textColor="gray-800">
        {COPY.MAIN_SCHEDULE_TITLE}
      </Text>
    </Text>
  );
}
