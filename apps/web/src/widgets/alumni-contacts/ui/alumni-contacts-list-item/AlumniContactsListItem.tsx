'use client';

import Link from 'next/link';

import { ChevronRight, HStack, Text, VStack, Flex } from '@causw/cds';

import {
  type AlumniSummaryDto,
  type GetAlumniContactsQuery,
} from '@/entities/alumni-contacts';

import { ProfileAvatar } from '@/shared/ui';

interface AlumniContactsListItemProps {
  item: AlumniSummaryDto;
  query: GetAlumniContactsQuery;
  onNavigate: (
    alumniContactsId: AlumniSummaryDto['id'],
    query: GetAlumniContactsQuery,
  ) => void;
}

export const AlumniContactsListItem = ({
  item,
  query,
  onNavigate,
}: AlumniContactsListItemProps) => {
  return (
    <li id={item.id}>
      <Link
        href={`/alumni-contacts/${item.id}`}
        onNavigate={() => onNavigate(item.id, query)}
        className="flex min-w-0 rounded-md bg-white py-3"
      >
        <HStack gap="none" className="min-w-0 grow" align="center">
          <Flex align="center" justify="center" className="relative shrink-0">
            <ProfileAvatar
              profileImageType={item.profileImage?.profileImageType ?? 'UNSET'}
              profileImageUrl={item.profileImage?.profileImageUrl}
              size={44}
              className="shrink-0"
            />
            {item.isCoffeeChatAvailable && (
              <span className="absolute right-0 bottom-0 size-3 rounded-full bg-green-400 ring-3 ring-white" />
            )}
          </Flex>
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
              {item.name ?? '-'}
            </Text>
            <HStack gap="sm" className="min-w-0 items-center">
              <Text
                typography="body-14-regular"
                textColor="gray-400"
                className="min-w-0 shrink-0"
              >
                {item.admissionYear ?? '-'}
              </Text>
              {item.description && (
                <HStack gap="sm" align="center">
                  <div className="h-2 w-px shrink-0 bg-gray-200" />
                  <Text
                    typography="body-14-regular"
                    textColor="gray-400"
                    className="line-clamp-1"
                    as="p"
                  >
                    {item.description}
                  </Text>
                </HStack>
              )}
            </HStack>
          </VStack>
          <ChevronRight
            size={12}
            color="gray-300"
            className="shrink-0 self-center"
          />
        </HStack>
      </Link>
    </li>
  );
};
