'use client';

import Link from 'next/link';

import { Avatar, ChevronRight, HStack, Text, VStack } from '@causw/cds';

import {
  type GetAlumniContactsQuery,
  type GetPaginatedAlumniContactsResponseDto,
} from '@/entities/alumni-contacts';

import { getProfileImageUrl } from '@/shared/lib';

type AlumniContactsListItem =
  GetPaginatedAlumniContactsResponseDto['content'][number];

interface AlumniContactsListItemProps {
  item: AlumniContactsListItem;
  query: GetAlumniContactsQuery;
  onNavigate: (
    alumniContactsId: AlumniContactsListItem['id'],
    query: GetAlumniContactsQuery,
  ) => void;
}

export const AlumniContactsListItem = ({
  item,
  query,
  onNavigate,
}: AlumniContactsListItemProps) => {
  const profileImageUrl = getProfileImageUrl({
    profileImageType: item.profileImage.profileImageType,
    profileImageUrl: item.profileImage.profileImageUrl,
    width: 64,
  });

  return (
    <li id={item.id}>
      <Link
        href={`/alumni-contacts/${item.id}`}
        onNavigate={() => onNavigate(item.id, query)}
        className="flex h-27.5 min-w-0 rounded-md bg-white px-4"
      >
        <HStack className="min-w-0 grow gap-5" align="center">
          <Avatar src={profileImageUrl} size={64} className="shrink-0" />
          <VStack gap="xs" className="min-w-0 grow" justify="center">
            <VStack className="gap-0.5">
              <Text
                typography="subtitle-16-bold"
                textColor="gray-700"
                className="truncate"
              >
                {item.name}
              </Text>
              <HStack className="min-w-0 items-center gap-2">
                <Text
                  typography="body-14-regular"
                  textColor="gray-400"
                  className="min-w-0 truncate"
                >
                  {item.admissionYear}
                </Text>
                <div className="h-2 w-px shrink-0 bg-gray-200" />
                <Text
                  typography="body-14-regular"
                  textColor="gray-400"
                  className="min-w-0 truncate"
                >
                  {item.academicStatus}
                </Text>
              </HStack>
            </VStack>
            {item.description && (
              <Text
                typography="body-15-regular"
                textColor="gray-700"
                className="line-clamp-1"
                as="p"
              >
                {item.description}
              </Text>
            )}
          </VStack>
          <ChevronRight
            size={12}
            color="gray-400"
            className="shrink-0 self-center"
          />
        </HStack>
      </Link>
    </li>
  );
};
