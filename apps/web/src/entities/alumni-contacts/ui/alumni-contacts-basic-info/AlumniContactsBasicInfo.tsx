import React from 'react';

import { HStack, Text, VStack, Flex } from '@causw/cds';

import { ProfileAvatar } from '@/shared/ui';

import { type GetAlumniContactsDetailResponseDto } from '../../model';

interface AlumniContactsBasicInfoProps {
  name: GetAlumniContactsDetailResponseDto['name'];
  admissionYear: GetAlumniContactsDetailResponseDto['admissionYear'];
  academicStatus: GetAlumniContactsDetailResponseDto['academicStatus'];
  department?: GetAlumniContactsDetailResponseDto['department'];
  profileImage: GetAlumniContactsDetailResponseDto['profileImage'];
  isCoffeeChatAvailable: GetAlumniContactsDetailResponseDto['isCoffeeChatAvailable'];
}

export const AlumniContactsBasicInfo = ({
  name,
  admissionYear,
  academicStatus,
  department,
  profileImage,
  isCoffeeChatAvailable,
}: AlumniContactsBasicInfoProps) => {
  const userInfo = [admissionYear, department?.name, academicStatus].filter(
    (item) => item,
  );

  return (
    <HStack gap="md" align="center">
      <Flex align="center" justify="center" className="relative shrink-0">
        <ProfileAvatar
          profileImageType={profileImage.profileImageType}
          profileImageUrl={profileImage.profileImageUrl}
          size={64}
        />
        {isCoffeeChatAvailable && (
          <span className="absolute right-[0.188rem] bottom-[0.188rem] size-2.5 rounded-full bg-green-400 ring-3 ring-white" />
        )}
      </Flex>
      <VStack gap="none">
        <Text typography="subtitle-18-bold" textColor="gray-800">
          {name}
        </Text>
        <HStack gap="sm" className="items-center">
          {userInfo.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <Text typography="body-16-regular" textColor="gray-400">
                {item}
              </Text>
              {index < userInfo.length - 1 && (
                <div className="h-2 w-px bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
};
