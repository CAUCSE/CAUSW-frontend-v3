'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import {
  NOTIFICATION_TYPE_MAP,
  useNotificationLatest,
} from '@/entities/notification';

import { COPY, ROUTES } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';
//TODO : 알림 팝업 삭제 event에 대해서 기획 나오면 수정
//TODO : 알림 팝업 내용 확인 with 기획/be ; 지금꺼는 임의로
export function NotificationPopupCard() {
  const [isClosed, setIsClosed] = useState(false);
  const { data, isLoading } = useNotificationLatest();
  if (isLoading) return null;
  if (!data || data.isRead) return null;
  if (isClosed) return null;

  return (
    <QueryErrorBoundary FallbackComponent={() => null}>
      <HStack className="w-full items-start justify-between rounded-2xl bg-white px-6 py-4">
        <Link
          href={ROUTES.NOTIFICATION}
          className="flex flex-1 items-center gap-5"
        >
          <SpeakerColored size={26} />
          <VStack className="items-start gap-0">
            <Text typography="subtitle-16-bold">
              {COPY.NEW_NOTIFICATION_TITLE}
            </Text>
            <Text typography="body-14-regular" textColor="gray-400">
              {
                NOTIFICATION_TYPE_MAP[
                  data.noticeType as keyof typeof NOTIFICATION_TYPE_MAP
                ]
              }{' '}
              - {data.title}
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
