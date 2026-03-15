'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from '@/shared/model';

import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Separator,
  Call,
  Message,
  Mail,
  ChevronLeft,
} from '../../../../../../packages/design-system/cds';

interface AlumniData {
  profileImageUrl?: string;
  name: string;
  admissionYear: string;
  academicStatus: string;
  job: string;
  description: string;
  email: string;
  phoneNumber?: string;
}

export const AlumniDetailCard = ({ data }: { data: AlumniData }) => {
  const router = useRouter();
  const [isMobile] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      /Mobi|Android/i.test(navigator.userAgent),
  );

  const handleCall = () => {
    if (!data.phoneNumber || data.phoneNumber === '전화번호 없음') {
      toast.error('등록된 전화번호가 없습니다.');
      return;
    }
    if (isMobile) window.location.href = `tel:${data.phoneNumber}`;
    else toast.error('웹에서는 지원되지 않는 기능입니다.');
  };

  const handleMessage = () => {
    if (!data.phoneNumber || data.phoneNumber === '전화번호 없음') {
      toast.error('등록된 전화번호가 없습니다.');
      return;
    }
    if (isMobile) window.location.href = `sms:${data.phoneNumber}`;
    else toast.error('웹에서는 지원되지 않는 기능입니다.');
  };

  return (
    <Box className="rounded-none bg-gradient-to-b from-[#4C688F] to-[#1E2E3F] pb-6 md:rounded-t-2xl">
      <div className="mb-10 pt-8 pl-6">
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center border-none bg-transparent p-0"
        >
          <ChevronLeft size={18} className="mr-2 -ml-1 text-white" />
          <Text typography="subtitle-16-bold" className="text-[#F9FAFB]">
            뒤로
          </Text>
        </button>
      </div>

      <VStack align="start" gap="none" className="px-6">
        <Avatar src={data.profileImageUrl} size="80" className="mb-4" />

        <Text typography="title-24-bold" className="mb-1 text-white">
          {data.name}
        </Text>

        <HStack align="center" gap="none" className="mb-4">
          <Text typography="body-16-regular" className="text-gray-400">
            {data.admissionYear}
          </Text>
          <Separator orientation="vertical" className="mx-2 h-2 bg-[#99A1AF]" />
          <Text typography="body-16-regular" className="text-gray-400">
            {data.academicStatus}
          </Text>
          <Separator orientation="vertical" className="mx-2 h-2 bg-[#99A1AF]" />
          <Text typography="body-16-regular" className="text-gray-400">
            {data.job}
          </Text>
        </HStack>

        <Text
          typography="body-16-regular"
          className="mb-6 whitespace-pre-line text-white"
        >
          {data.description}
        </Text>

        <HStack
          justify="start"
          className="w-full gap-3 overflow-x-auto pb-1 whitespace-nowrap"
        >
          <Box
            onClick={handleCall}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
          >
            <Call size={18} className="text-gray-300" />
            <Text typography="body-14-semibold" className="text-gray-500">
              전화
            </Text>
          </Box>

          <Box
            onClick={handleMessage}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
          >
            <Message size={18} className="text-gray-300" />
            <Text typography="body-14-semibold" className="text-gray-500">
              메시지
            </Text>
          </Box>

          <Box className="flex shrink-0 items-center gap-1.5 rounded-sm bg-white px-3 py-2">
            <Mail size={18} className="text-gray-300" />
            <Text typography="body-14-semibold" className="text-gray-500">
              {data.email}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
