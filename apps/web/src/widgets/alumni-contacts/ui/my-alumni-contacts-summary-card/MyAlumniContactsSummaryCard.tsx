'use client';

import Link from 'next/link';

import { HStack, Text, VStack } from '@causw/cds';

import { type AlumniSummaryDto } from '@/entities/alumni-contacts';

import { ROUTES } from '@/shared/constants';
import { ProfileAvatar } from '@/shared/ui';

interface MyAlumniContactsSummaryCardProps {
  myProfile: AlumniSummaryDto;
}

export const MyAlumniContactsSummaryCard = ({
  myProfile,
}: MyAlumniContactsSummaryCardProps) => {
  return (
    <li>
      <Link
        href={ROUTES.PROFILE}
        className="flex min-w-0 rounded-md bg-white py-3"
      >
        <HStack gap="none" className="min-w-0 grow" align="center">
          <div className="align-center jusity-center relative flex shrink-0">
            <ProfileAvatar
              profileImageType={
                myProfile.profileImage?.profileImageType ?? 'UNSET'
              }
              profileImageUrl={myProfile.profileImage?.profileImageUrl}
              size={44}
              className="shrink-0"
            />
            {myProfile.isCoffeeChatAvailable && (
              <span className="absolute right-0 bottom-0 size-3 rounded-full bg-green-400 ring-3 ring-white" />
            )}
          </div>
          <VStack
            gap="none"
            className="min-w-0 grow pr-3 pl-4"
            justify="center"
          >
            <Text
              typography="subtitle-16-bold"
              textColor="gray-700"
              className="truncate"
            >
              {myProfile.name ?? '-'}
            </Text>
            <HStack gap="sm" className="min-w-0 items-center">
              <Text
                typography="body-14-regular"
                textColor="gray-400"
                className="min-w-0 shrink-0"
              >
                {myProfile.admissionYear ?? '-'}
              </Text>
              {myProfile.description && (
                <HStack gap="sm" align="center">
                  <div className="h-2 w-px shrink-0 bg-gray-200" />
                  <Text
                    typography="body-14-regular"
                    textColor="gray-400"
                    className="line-clamp-1"
                    as="p"
                  >
                    {myProfile.description}
                  </Text>
                </HStack>
              )}
            </HStack>
          </VStack>
        </HStack>
      </Link>
    </li>
  );
};
