'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import { useSystemNoticeLatest } from '@/entities/system-notices';

import { ROUTES } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';

export function LatestSystemNoticePopupCard() {
  const [isClosed, setIsClosed] = useState(false);
  const { data, isLoading } = useSystemNoticeLatest();
  if (isLoading) return null;
  if (!data || data.isRead) return null;
  if (isClosed) return null;
  return (
    <QueryErrorBoundary FallbackComponent={() => null}>
      <HStack className="w-full items-start justify-between rounded-2xl bg-white px-6 py-4">
        <Link
          href={ROUTES.SYSTEM_NOTICES}
          target={undefined}
          className="flex flex-1 items-center gap-5"
        >
          <SpeakerColored size={26} />
          <VStack className="items-start gap-0">
            <Text typography="subtitle-16-bold">{'시스템 공지'}</Text>
            <Text typography="body-14-regular" textColor="gray-400">
              {data.content.length > 10
                ? `${data.content.slice(0, 10)}...`
                : data.content}
            </Text>
          </VStack>
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsClosed(true);
          }}
          className="cursor-pointer"
        >
          <Close size={20} />
        </button>
      </HStack>
    </QueryErrorBoundary>
  );
}
