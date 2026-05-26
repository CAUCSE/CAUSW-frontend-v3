import React from 'react';

import { HStack, Text, VStack } from '@causw/cds';

import { ProfileAvatar } from '@/shared/ui';

import { type GetAlumniContactsDetailResponseDto } from '../../model';

interface AlumniContactsBasicInfoProps {
  name: GetAlumniContactsDetailResponseDto['name'];
  admissionYear: GetAlumniContactsDetailResponseDto['admissionYear'];
  academicStatus: GetAlumniContactsDetailResponseDto['academicStatus'];
  profileImage: GetAlumniContactsDetailResponseDto['profileImage'];
}

export const AlumniContactsBasicInfo = ({
  name,
  admissionYear,
  academicStatus,
  profileImage,
}: AlumniContactsBasicInfoProps) => {
  const userInfo = [admissionYear, academicStatus].filter((item) => item);

  return (
    <>
      <ProfileAvatar
        profileImageType={profileImage.profileImageType}
        profileImageUrl={profileImage.profileImageUrl}
        size={80}
        className="[&>span]:md:rounded-[32px]"
      />
      <VStack gap="xs">
        <Text typography="title-24-bold" textColor="white">
          {name}
        </Text>
        <HStack gap="sm" className="items-center">
          {userInfo.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <Text typography="body-16-regular" textColor="gray-400">
                {item}
              </Text>
              {index < userInfo.length - 1 && (
                <div className="h-2 w-px bg-gray-500" />
              )}
            </React.Fragment>
          ))}
        </HStack>
      </VStack>
    </>
  );
};
