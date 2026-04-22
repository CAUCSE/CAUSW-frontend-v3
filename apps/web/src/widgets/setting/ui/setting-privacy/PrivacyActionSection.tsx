'use client';

import { ChevronRight, Flex, Text, VStack } from '@causw/cds';

export const PRIVACY_ACTION_TYPE = {
  LOGOUT: 'logout',
  WITHDRAW: 'withdraw',
} as const;

export type PrivacyActionType =
  (typeof PRIVACY_ACTION_TYPE)[keyof typeof PRIVACY_ACTION_TYPE];

const PRIVACY_ACTION_LABEL: Record<PrivacyActionType, string> = {
  [PRIVACY_ACTION_TYPE.LOGOUT]: '로그아웃',
  [PRIVACY_ACTION_TYPE.WITHDRAW]: '회원탈퇴',
};

interface PrivacyAction {
  type: PrivacyActionType;
  onClick: () => void;
}

interface PrivacyActionSectionProps {
  actions: PrivacyAction[];
}

export const PrivacyActionSection = ({
  actions,
}: PrivacyActionSectionProps) => (
  <VStack className="gap-2 rounded-2xl bg-white p-4">
    {actions.map((action) => (
      <button
        key={action.type}
        type="button"
        onClick={action.onClick}
        className="w-full cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50"
      >
        <Flex justify="between" align="center" className="w-full">
          <Text typography="subtitle-16-bold" textColor="gray-700">
            {PRIVACY_ACTION_LABEL[action.type]}
          </Text>
          <ChevronRight size={18} className="text-gray-300" />
        </Flex>
      </button>
    ))}
  </VStack>
);
