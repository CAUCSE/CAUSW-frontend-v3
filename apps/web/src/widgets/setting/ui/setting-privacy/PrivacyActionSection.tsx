'use client';

import { ChevronRight, Flex, Text, VStack } from '@causw/cds';

interface PrivacyActionSectionProps {
  onLogout: () => void;
  onWithdraw: () => void;
}

export const PrivacyActionSection = ({
  onLogout,
  onWithdraw,
}: PrivacyActionSectionProps) => (
  <VStack className="gap-2 rounded-2xl bg-white p-4">
    <button
      type="button"
      onClick={onLogout}
      className="w-full cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50"
    >
      <Flex justify="between" align="center" className="w-full">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          로그아웃
        </Text>
        <ChevronRight size={18} className="text-gray-300" />
      </Flex>
    </button>

    <button
      type="button"
      onClick={onWithdraw}
      className="w-full cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50"
    >
      <Flex justify="between" align="center" className="w-full">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          회원탈퇴
        </Text>
        <ChevronRight size={18} className="text-gray-300" />
      </Flex>
    </button>
  </VStack>
);
