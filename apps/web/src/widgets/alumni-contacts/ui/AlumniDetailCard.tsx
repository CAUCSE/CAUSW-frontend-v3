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
  isPhoneNumberVisible?: boolean;
}

interface Props {
  data: AlumniData;
  isMyProfile?: boolean;
  isEditing?: boolean;
  onActionClick?: () => void;
  onOpenDialog?: (type: string, initialValue?: string | boolean) => void;
}

const PencilIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-1 text-white"
  >
    <path
      d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AlumniDetailCard = ({
  data,
  isMyProfile,
  isEditing,
  onActionClick,
  onOpenDialog,
}: Props) => {
  const router = useRouter();
  const [isMobile] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      /Mobi|Android/i.test(navigator.userAgent),
  );
  console.log('data.isPhoneNumberVisible:', data.isPhoneNumberVisible);

  const handleCall = () => {
    if (isEditing) {
      onOpenDialog?.('EDIT_VISIBLE', data.isPhoneNumberVisible ?? true);
      return;
    }

    if (
      !data.phoneNumber ||
      data.phoneNumber === '전화번호 없음' ||
      data.isPhoneNumberVisible === false
    ) {
      toast.error('등록된 전화번호가 없거나 비공개 상태입니다.');
      return;
    }
    if (isMobile) window.location.href = `tel:${data.phoneNumber}`;
    else toast.error('웹에서는 지원되지 않는 기능입니다.');
  };

  const handleMessage = () => {
    if (isEditing) {
      onOpenDialog?.('EDIT_VISIBLE', data.isPhoneNumberVisible ?? true);
      return;
    }

    if (
      !data.phoneNumber ||
      data.phoneNumber === '전화번호 없음' ||
      data.isPhoneNumberVisible === false
    ) {
      toast.error('등록된 전화번호가 없거나 비공개 상태입니다.');
      return;
    }
    if (isMobile) window.location.href = `sms:${data.phoneNumber}`;
    else toast.error('웹에서는 지원되지 않는 기능입니다.');
  };

  return (
    <Box className="rounded-none bg-gradient-to-b from-[#4C688F] to-[#1E2E3F] pb-6 md:rounded-t-2xl">
      <div className="mb-10 flex items-center justify-between px-6 pt-8">
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center border-none bg-transparent p-0"
        >
          <ChevronLeft size={18} className="mr-2 -ml-1 text-white" />
          <Text typography="subtitle-16-bold" className="text-[#F9FAFB]">
            뒤로
          </Text>
        </button>

        {isMyProfile && (
          <button
            onClick={onActionClick}
            className="cursor-pointer border-none bg-transparent p-0"
          >
            <Text
              typography="subtitle-16-bold"
              className={isEditing ? 'text-[#CACED5]' : 'text-white'}
            >
              {isEditing ? '저장하기' : '수정하기'}
            </Text>
          </button>
        )}
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

          <div
            onClick={() => isEditing && onOpenDialog?.('EDIT_JOB', data.job)}
            className={`flex items-center ${isEditing ? 'cursor-pointer rounded-md bg-white/10 px-2 py-1' : ''}`}
          >
            <Text
              typography="body-16-regular"
              className={isEditing ? 'text-white' : 'text-gray-400'}
            >
              {data.job}
            </Text>
            {isEditing && <PencilIcon />}
          </div>
        </HStack>
        <div
          onClick={() =>
            isEditing && onOpenDialog?.('EDIT_DESC', data.description)
          }
          className={`relative mb-6 w-full ${isEditing ? 'cursor-pointer rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10' : ''}`}
        >
          <Text
            typography="body-16-regular"
            className="leading-[1.6] whitespace-pre-line text-white"
          >
            {data.description}
          </Text>
          {isEditing && (
            <div className="absolute right-3 bottom-3">
              <PencilIcon />
            </div>
          )}
        </div>

        <HStack
          justify="start"
          className="w-full gap-3 overflow-x-auto pb-1 whitespace-nowrap"
        >
          <Box
            onClick={handleCall}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
          >
            <Call size={18} className="text-gray-400" />
            <Text typography="body-14-semibold" className="text-gray-600">
              {/* 삼항 연산자를 사용하여 명확하게 렌더링 */}
              {data.isPhoneNumberVisible === false ? '전화 (비공개)' : '전화'}
            </Text>
          </Box>

          <Box
            onClick={handleMessage}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
          >
            <Message size={18} className="text-gray-400" />
            <Text typography="body-14-semibold" className="text-gray-600">
              {data.isPhoneNumberVisible === false
                ? '메세지 (비공개)'
                : '메세지'}
            </Text>
          </Box>

          <Box className="flex shrink-0 items-center gap-1.5 rounded-sm bg-white px-3 py-2">
            <Mail size={18} className="text-gray-400" />
            <Text typography="body-14-semibold" className="text-gray-600">
              {data.email}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};
