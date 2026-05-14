'use client';

import { Fragment, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import {
  Box,
  CommentColored,
  HStack,
  HeartColored,
  PenColored,
  Separator,
  Text,
} from '@causw/cds';

import type { ActivityType } from '@/entities/setting';

import { SETTING_ACTIVITY_ITEMS } from '../../config';

const ACTIVITY_ICON_MAP: Record<ActivityType, ReactNode> = {
  'my-posts': <PenColored />,
  'my-comments': <CommentColored />,
  favorites: <HeartColored />,
};

export const SettingActivitySection = () => {
  const router = useRouter();

  return (
    <Box
      radius="lg"
      className="flex h-fit w-full justify-center bg-white px-4 py-3"
    >
      <HStack gap="md" className="h-fit">
        {SETTING_ACTIVITY_ITEMS.map((item, index) => (
          <Fragment key={item.id}>
            <button
              type="button"
              className="flex h-fit cursor-pointer flex-col items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-50 active:bg-gray-100"
              onClick={() => router.push(item.href)}
            >
              {ACTIVITY_ICON_MAP[item.id]}
              <Text typography="body-14-medium" textColor="gray-700">
                {item.label}
              </Text>
            </button>
            {index < SETTING_ACTIVITY_ITEMS.length - 1 && (
              <Separator
                orientation="vertical"
                className="mx-0 h-6 shrink-0 self-center"
              />
            )}
          </Fragment>
        ))}
      </HStack>
    </Box>
  );
};
