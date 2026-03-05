'use client';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import { CalendarEventList } from '@/widgets/calendar';

import { COPY } from '@/shared/constants';
import { ActionHeader } from '@/shared/ui';

export function CalendarPage() {
  const router = useRouter();

  return (
    <VStack className="max-w-laptop a mx-auto w-full gap-2">
      <ActionHeader title={COPY.BACK} className="tablet:mt-6 tablet:mx-6 pt-4">
        <ActionHeader.BackButton onClick={() => router.back()}>
          {COPY.BACK}
        </ActionHeader.BackButton>
      </ActionHeader>

      <VStack className="tablet:px-12 w-full gap-3 px-4 pb-40">
        <VStack className="gap-2">
          <Text typography="title-24-bold" textColor="gray-900">
            {COPY.MONTHLY_SCHEDULE_TITLE}
          </Text>
        </VStack>

        <CalendarEventList />
      </VStack>
    </VStack>
  );
}
