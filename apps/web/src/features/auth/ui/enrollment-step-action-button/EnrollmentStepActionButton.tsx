'use client';

import { CTAButton } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

interface EnrollmentStepActionButtonProps extends Pick<
  StepCardData,
  'action' | 'state' | 'buttonLabel'
> {
  onAction?: () => void;
}

export const EnrollmentStepActionButton = ({
  action,
  state,
  buttonLabel,
  onAction,
}: EnrollmentStepActionButtonProps) => {
  if (state !== 'active' || !buttonLabel) return null;

  return (
    <CTAButton
      color="blue"
      fullWidth
      disabled={action === 'edit'}
      onClick={onAction}
    >
      {buttonLabel}
    </CTAButton>
  );
};
