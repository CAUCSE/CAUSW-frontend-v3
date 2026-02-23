'use client';
import { useState } from 'react';

import Link from 'next/link';

import { Close, HStack, SpeakerColored, Text, VStack } from '@causw/cds';

import { COPY, ROUTES } from '@/shared/constants';
//TODO : 알림 내용 수정 api 연결 & 알림 띄우기 여부 api 연결

export function NotificationPopupCard() {
  const [isVisible, setIsVisible] = useState(true); //api 연결 후 수정

  if (!isVisible) return null;

  return (
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
            새소식 또는 긴급공지 노출
          </Text>
        </VStack>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
        className="cursor-pointer"
      >
        <Close size={20} />
      </button>
    </HStack>
  );
}
