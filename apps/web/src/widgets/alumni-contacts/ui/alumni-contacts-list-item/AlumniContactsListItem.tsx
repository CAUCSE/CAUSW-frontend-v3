import Link from 'next/link';

import { Avatar, ChevronRight, HStack, Text, VStack } from '@causw/cds';

import type { GetPaginatedAlumniContactsResponseDto } from '@/entities/alumni-contacts';

type AlumniContactsListItem =
  GetPaginatedAlumniContactsResponseDto['content'][number];

interface AlumniContactsListItemProps {
  item: AlumniContactsListItem;
}

export const AlumniContactsListItem = ({
  item,
}: AlumniContactsListItemProps) => {
  return (
    <Link href={`/alumni-contacts/${item.id}`} key={item.id}>
      <li className="flex gap-3 rounded-md bg-white p-4">
        <HStack className="grow gap-5">
          <Avatar src={item.profileImageUrl} size="64" className="shrink-0" />
          <VStack gap="none" className="grow">
            <Text typography="subtitle-16-bold" color="gray-700">
              {item.name}
            </Text>
            <HStack className="items-center gap-2">
              <Text typography="body-14-regular" color="gray-400">
                {item.admissionYear}
              </Text>
              <div className="h-2 w-px shrink-0 bg-gray-200" />
              <Text typography="body-14-regular" color="gray-400">
                {item.academicStatus}
              </Text>
            </HStack>
            <p>{item.hob}</p>
            <p className="line-clamp-1">{item.description}</p>
          </VStack>
          <ChevronRight
            size={12}
            color="gray-400"
            className="shrink-0 self-center"
          />
        </HStack>
      </li>
    </Link>
  );
};
