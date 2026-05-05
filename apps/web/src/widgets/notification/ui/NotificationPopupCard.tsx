'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import {
  getNotificationPopupLink,
  useLatestNotification,
} from '@/entities/notification';

import { QueryErrorBoundary } from '@/shared/ui';
//TODO : 알림 팝업 삭제 -> 읽음 처리로 변경 api 나오면 추가 필요
//TODO : 페이지 모두 구현된 후 링크 주소 잘 가는 지 확인 필요
export function NotificationPopupCard() {
  const [isClosed, setIsClosed] = useState(false);
  const { data, isLoading } = useLatestNotification();
  if (isLoading) return null;
  if (!data || data.isRead) return null;
  if (isClosed) return null;

  return (
    <QueryErrorBoundary FallbackComponent={() => null}>
      <HStack className="w-full items-start justify-between rounded-2xl bg-white px-6 py-4">
        <Link
          href={getNotificationPopupLink(data)}
          className="flex flex-1 items-center gap-5"
        >
          <SpeakerColored size={26} />
          <VStack className="items-start gap-0">
            <Text typography="subtitle-16-bold">{data.title}</Text>
            <Text typography="body-14-regular" textColor="gray-400">
              {data.body}
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
