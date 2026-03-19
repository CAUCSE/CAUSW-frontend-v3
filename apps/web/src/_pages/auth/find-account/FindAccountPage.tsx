'use client';

import { AuthContainer, FindAccountContainer } from '@/widgets/auth';

import { ActionHeader } from '@/shared/ui';

export const FindAccountPage = () => {
  return (
    <AuthContainer>
      <ActionHeader isSticky={false} background="gray" buttonColor="gray">
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <FindAccountContainer />
    </AuthContainer>
  );
};
