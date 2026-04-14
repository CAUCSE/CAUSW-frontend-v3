'use client';

import { useRouter } from 'next/navigation';

import { VStack } from '@causw/cds';

import { AuthContainer } from '@/widgets/auth';

import { ResetPasswordForm } from '@/features/auth';

import type { ResetPasswordFormData } from '@/entities/auth';

import { toast } from '@/shared/model';
import { ActionHeader } from '@/shared/ui';

export const ResetPasswordPage = () => {
  const router = useRouter();

  // TODO: API 연동 후 실제 비밀번호 변경 로직으로 교체
  const handleSubmit = (_data: ResetPasswordFormData) => {
    toast.success('비밀번호 변경이 완료되었습니다.');
    router.replace('/auth/sign-in/email');
  };

  return (
    <AuthContainer>
      <VStack className="w-full gap-4 md:gap-10">
        <ActionHeader
          isSticky={false}
          background="gray"
          buttonColor="gray"
          className="px-0"
        >
          <ActionHeader.BackButton
            onClick={() => router.replace('/auth/sign-in')}
          >
            닫기
          </ActionHeader.BackButton>
        </ActionHeader>

        <ResetPasswordForm onSubmit={handleSubmit} />
      </VStack>
    </AuthContainer>
  );
};
