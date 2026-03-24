'use client';

import { Box, HStack, Text, Call, Message, Mail } from '@causw/cds';

import { type AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';

import { toast } from '@/shared/model';

interface ActionButtonsProps {
  data: AlumniDetailResponseDto;
  isEditing?: boolean;
  isMobile: boolean;
  onOpenDialog?: (type: string, initialValue?: string | boolean) => void;
}

export const ActionButtons = ({
  data,
  isEditing,
  isMobile,
  onOpenDialog,
}: ActionButtonsProps) => {
  const handleAction = (type: 'tel' | 'sms') => {
    if (isEditing) {
      onOpenDialog?.('EDIT_VISIBLE', data.isPhoneNumberVisible ?? true);
      return;
    }

    if (
      !data.phoneNumber ||
      data.phoneNumber === '전화번호 없음' ||
      !data.isPhoneNumberVisible
    ) {
      toast.error('등록된 전화번호가 없거나 비공개 상태입니다.');
      return;
    }

    if (isMobile) {
      window.location.href = `${type}:${data.phoneNumber}`;
    } else {
      toast.error('웹에서는 지원되지 않는 기능입니다.');
    }
  };

  return (
    <HStack
      justify="start"
      className="w-full gap-3 overflow-x-auto pb-1 whitespace-nowrap"
    >
      <Box
        onClick={() => handleAction('tel')}
        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
      >
        <Call size={18} className="text-gray-400" />
        <Text typography="body-14-semibold" className="text-gray-600">
          {!data.isPhoneNumberVisible ? '전화 (비공개)' : '전화'}
        </Text>
      </Box>

      <Box
        onClick={() => handleAction('sms')}
        className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-white px-3 py-2"
      >
        <Message size={18} className="text-gray-400" />
        <Text typography="body-14-semibold" className="text-gray-600">
          {!data.isPhoneNumberVisible ? '메세지 (비공개)' : '메세지'}
        </Text>
      </Box>

      <Box className="flex shrink-0 items-center gap-1.5 rounded-sm bg-white px-3 py-2">
        <Mail size={18} className="text-gray-400" />
        <Text typography="body-14-semibold" className="text-gray-600">
          {data.email}
        </Text>
      </Box>
    </HStack>
  );
};
