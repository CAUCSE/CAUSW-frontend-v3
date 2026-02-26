'use client';

import { VStack } from '@causw/cds';

import {
  type EnrollmentStatus,
  type EnrollmentAction,
  getEnrollmentStepsByStatus,
  EnrollmentStepCard,
} from '@/entities/auth';

interface EnrollmentStepperProps {
  status: EnrollmentStatus;
  rejectedReason?: string;
  actionHandlers: Record<EnrollmentAction, () => void>;
}

/**
 * 재학인증 스텝 목록을 조합하여 렌더링하는 위젯
 *
 * entities의 EnrollmentStepCard를 config 매핑에 따라 조합합니다.
 */
export const EnrollmentStepContainer = ({
  status,
  rejectedReason,
  actionHandlers,
}: EnrollmentStepperProps) => {
  const steps = getEnrollmentStepsByStatus(status, rejectedReason);

  return (
    <VStack className="w-full gap-4">
      {steps.map((step) => (
        <EnrollmentStepCard
          key={step.stepNumber}
          {...step}
          onAction={step.action ? actionHandlers[step.action] : undefined}
          rejectedReason={rejectedReason}
          statusLabel={step.statusLabel}
        />
      ))}
    </VStack>
  );
};
