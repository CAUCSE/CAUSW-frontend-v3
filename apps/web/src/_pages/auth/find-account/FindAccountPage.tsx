'use client';

import { VStack } from '@causw/cds';

import { AuthContainer, FindAccountContainer } from '@/widgets/auth';

import { ActionHeader } from '@/shared/ui';

export const FindAccountPage = () => {
  return (
    <AuthContainer>
      <VStack className="w-full gap-4 md:gap-10">
        <ActionHeader
          isSticky={false}
          background="gray"
          buttonColor="gray"
          className="px-0"
        >
          <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        </ActionHeader>
        <FindAccountContainer />
      </VStack>
    </AuthContainer>
  );
};
