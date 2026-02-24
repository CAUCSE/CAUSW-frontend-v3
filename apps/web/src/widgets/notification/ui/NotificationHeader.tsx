import Link from 'next/link';

import { Bell, HStack, Text } from '@causw/cds';

import { ROUTES } from '@/shared/constants';
import { StatusDot } from '@/shared/ui';

export function NotificationHeader() {
  //TODO : 새로운 알림 api 정보 필요
  //TODO : 로고 변경
  const newNotification = true;
  return (
    <HStack className="w-full justify-between px-1 py-2">
      <Text typography="subtitle-18-bold" color="gray-400">
        크자회 Logo
      </Text>

      <Link href={ROUTES.NOTIFICATION} className="relative">
        <Bell size={24} color="gray-400" />
        {newNotification && (
          <StatusDot
            show={true}
            top={-2}
            right={-1}
            className="h-[0.313rem] w-[0.313rem] bg-red-400"
          />
        )}
      </Link>
    </HStack>
  );
}
