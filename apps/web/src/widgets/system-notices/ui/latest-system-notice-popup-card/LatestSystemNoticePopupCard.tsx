'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import { useSystemNoticeLatest } from '@/entities/system-notices';

import { ROUTES } from '@/shared/constants';

export function LatestSystemNoticePopupCard() {
  const [isClosed, setIsClosed] = useState(false);
  const { data } = useSystemNoticeLatest();
  if (!data?.id || data.isRead || isClosed) return null;

  return (
    <HStack className="mx-4 mb-2 items-start justify-between rounded-lg bg-gray-100 px-4 py-3">
      <Link
        href={ROUTES.SYSTEM_NOTICES}
        className="flex min-w-0 flex-1 items-center gap-5"
      >
        <SpeakerColored size={26} className="shrink-0" />
        <VStack className="items-start gap-0">
          <Text typography="subtitle-16-bold" textColor="gray-700">
            새 알림
          </Text>
          <Text
            typography="body-14-regular"
            textColor="gray-500"
            className="line-clamp-1 break-all"
          >
            {data.title || data.content}
          </Text>
        </VStack>
      </Link>
      <button
        type="button"
        onClick={() => setIsClosed(true)}
        aria-label="알림 배너 닫기"
        className="cursor-pointer rounded-sm p-1"
      >
        <Close size={20} color="gray-400" />
      </button>
    </HStack>
  );
}
