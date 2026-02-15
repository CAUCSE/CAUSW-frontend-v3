'use client';

import { Text, VStack } from '@causw/cds';

import { AuthContainer, EnrollmentStepContainer } from '@/widgets/auth';

import { type EnrollmentStatus, type EnrollmentAction } from '@/entities/auth';

interface EnrollmentVerificationPageProps {
  status?: EnrollmentStatus;
  rejectedReason?: string;
}

export const EnrollmentVerificationPage = ({
  status = 'AWAITING_SUBMIT',
  rejectedReason = '',
}: EnrollmentVerificationPageProps) => {
  const actionHandlers: Record<EnrollmentAction, () => void> = {
    submit: () => {
      // TODO: 재학정보 제출 페이지로 이동
    },
    edit: () => {
      // TODO: 재학정보 수정 페이지로 이동
    },
    resubmit: () => {
      // TODO: 재학정보 다시 제출 페이지로 이동
    },
  };

  return (
    <AuthContainer>
      <VStack className="w-full gap-10">
        {/* 타이틀 섹션 */}
        <VStack justify="center" className="w-full gap-6">
          <Text
            as="h1"
            typography="title-22-bold"
            textColor="gray-800"
            className="whitespace-pre-wrap"
          >
            {'재학정보 인증하기 '}
          </Text>
          <Text
            typography="body-18-medium"
            textColor="gray-600"
            className="leading-relaxed whitespace-pre-wrap"
          >
            서비스를 계속해서 이용하러면{'\n'}
            <Text typography="subtitle-18-bold" textColor="blue-700">
              재학정보
            </Text>
            {' 인증이 필요해요'}
          </Text>
        </VStack>

        {/* 스텝 카드 영역 */}
        <EnrollmentStepContainer
          status={status}
          rejectedReason={rejectedReason}
          actionHandlers={actionHandlers}
        />
      </VStack>
    </AuthContainer>
  );
};
