'use client';

import { mergeStyles } from '@causw/cds';

import { EnrollmentStepActionButton } from '@/features/auth';

import type { StepCardData } from '@/entities/auth';
import { EnrollmentStepBody } from '@/entities/auth';

import { EnrollmentStepCardHeader } from '../enrollment-step-card-header';

export interface EnrollmentStepCardProps extends StepCardData {
  onAction?: () => void;
  rejectedReason?: string;
}

export const EnrollmentStepCard = ({
  stepNumber,
  title,
  state,
  statusLabel,
  description,
  highlightText,
  rejectedReason,
  buttonLabel,
  onAction,
}: EnrollmentStepCardProps) => {
  return (
    <div
      className={mergeStyles(
        'flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4',
        state === 'active' && 'border-2 border-blue-700',
      )}
    >
      <EnrollmentStepCardHeader
        stepNumber={stepNumber}
        title={title}
        state={state}
        statusLabel={statusLabel}
      />

      <EnrollmentStepBody
        state={state}
        description={description}
        highlightText={highlightText}
        rejectedReason={rejectedReason}
      />

      <EnrollmentStepActionButton
        state={state}
        buttonLabel={buttonLabel}
        onAction={onAction}
      />
    </div>
  );
};
