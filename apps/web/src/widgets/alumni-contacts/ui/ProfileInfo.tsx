'use client';

import { Avatar, Text, HStack, Separator, VStack } from '@causw/cds';

import { type AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';

interface ProfileInfoProps {
  data: AlumniDetailResponseDto;
  isEditing?: boolean;
  onOpenDialog?: (type: string, initialValue?: string | boolean) => void;
}

const PencilIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
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

export const ProfileInfo = ({
  data,
  isEditing,
  onOpenDialog,
}: ProfileInfoProps) => (
  <VStack align="start" gap="none" className="w-full">
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
      onClick={() => isEditing && onOpenDialog?.('EDIT_DESC', data.description)}
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
  </VStack>
);
