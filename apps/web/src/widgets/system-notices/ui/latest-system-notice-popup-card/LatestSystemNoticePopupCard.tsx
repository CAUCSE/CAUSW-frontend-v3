'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import { useSystemNoticeLatest } from '@/entities/system-notices';

import { ROUTES } from '@/shared/constants';

export function LatestSystemNoticePopupCard() {
  const [isClosed, setIsClosed] = useState(false);
  const { data } = useSystemNoticeLatest();
  if (!data?.id || data.isRead) return null;
  if (isClosed) return null;
  return (
    <HStack className="w-full items-start justify-between rounded-2xl bg-white px-6 py-4">
      <Link
        href={ROUTES.SYSTEM_NOTICES}
        target={undefined}
        className="flex flex-1 items-center gap-5"
      >
        <SpeakerColored size={26} className="shrink-0" />
        <VStack className="items-start gap-0">
          <Text typography="subtitle-16-bold">{'시스템 공지'}</Text>
          <Text
            typography="body-14-regular"
            textColor="gray-400"
            className="line-clamp-1 break-all"
          >
            {data.title || data.content}
          </Text>
        </VStack>
      </Link>
      <button
        type="button"
        onClick={() => setIsClosed(true)}
        className="cursor-pointer"
      >
        <Close size={20} />
      </button>
    </HStack>
  );
}
