'use client';

import { CTAButton } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

interface EnrollmentStepActionButtonProps extends Pick<
  StepCardData,
  'state' | 'buttonLabel'
> {
  onAction?: () => void;
}

export const EnrollmentStepActionButton = ({
  state,
  buttonLabel,
  onAction,
}: EnrollmentStepActionButtonProps) => {
  if (state !== 'active' || !buttonLabel) return null;

  return (
    <CTAButton color="blue" fullWidth onClick={onAction}>
      {buttonLabel}
    </CTAButton>
  );
};
