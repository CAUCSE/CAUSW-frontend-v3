import React from 'react';

import { HStack, Text, VStack, Flex } from '@causw/cds';

import { ProfileAvatar } from '@/shared/ui';

import { type GetAlumniContactsDetailResponseDto } from '../../model';

interface AlumniContactsBasicInfoProps {
  name: GetAlumniContactsDetailResponseDto['name'];
  admissionYear: GetAlumniContactsDetailResponseDto['admissionYear'];
  academicStatus: GetAlumniContactsDetailResponseDto['academicStatus'];
  departmentLabel?: GetAlumniContactsDetailResponseDto['departmentDescription'];
  profileImage: GetAlumniContactsDetailResponseDto['profileImage'];
  isCoffeeChatAvailable: GetAlumniContactsDetailResponseDto['isCoffeeChatAvailable'];
}

export const AlumniContactsBasicInfo = ({
  name,
  admissionYear,
  academicStatus,
  departmentLabel,
  profileImage,
  isCoffeeChatAvailable,
}: AlumniContactsBasicInfoProps) => {
  const userInfo = [admissionYear, departmentLabel, academicStatus].filter(
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
        <HStack gap="sm" className="items-center overflow-x-auto">
          {userInfo.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <Text
                typography="body-14-regular"
                textColor="gray-400"
                className="shrink-0 whitespace-nowrap"
              >
                {item}
              </Text>
              {index < userInfo.length - 1 && (
                <div className="h-2 w-px shrink-0 bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
};
