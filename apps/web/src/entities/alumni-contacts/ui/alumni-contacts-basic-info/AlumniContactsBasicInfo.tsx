import React from 'react';

import { Avatar, HStack, Text, VStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '../../model';

interface AlumniContactsBasicInfoProps {
  name: GetAlumniContactsDetailResponseDto['name'];
  admissionYear: GetAlumniContactsDetailResponseDto['admissionYear'];
  academicStatus: GetAlumniContactsDetailResponseDto['academicStatus'];
  profileImageUrl: GetAlumniContactsDetailResponseDto['profileImage']['profileImageUrl'];
}

export const AlumniContactsBasicInfo = ({
  name,
  admissionYear,
  academicStatus,
  profileImageUrl,
}: AlumniContactsBasicInfoProps) => {
  const userInfo = [admissionYear, academicStatus].filter((item) => item);

  return (
    <>
      <Avatar src={profileImageUrl} size={80} />
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
