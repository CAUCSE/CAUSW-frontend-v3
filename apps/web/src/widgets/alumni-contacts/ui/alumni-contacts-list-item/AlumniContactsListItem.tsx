import Link from 'next/link';

import { Avatar, ChevronRight, HStack, Text, VStack } from '@causw/cds';

import type { GetPaginatedAlumniContactsResponseDto } from '@/entities/alumni-contacts';

import { getProfileImageUrl } from '@/shared/lib';

type AlumniContactsListItem =
  GetPaginatedAlumniContactsResponseDto['content'][number];

interface AlumniContactsListItemProps {
  item: AlumniContactsListItem;
}

export const AlumniContactsListItem = ({
  item,
}: AlumniContactsListItemProps) => {
  const profileImageUrl = getProfileImageUrl({
    profileImageType: item.profileImage.profileImageType,
    profileImageUrl: item.profileImage.profileImageUrl,
    width: 64,
  });

  return (
    <Link href={`/alumni-contacts/${item.id}`} key={item.id}>
      <li className="flex h-27.5 min-w-0 gap-3 rounded-md bg-white px-4">
        <HStack className="min-w-0 grow gap-5" align="center">
          <Avatar src={profileImageUrl} size={64} className="shrink-0" />
          <VStack gap="none" className="min-w-0 grow">
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
