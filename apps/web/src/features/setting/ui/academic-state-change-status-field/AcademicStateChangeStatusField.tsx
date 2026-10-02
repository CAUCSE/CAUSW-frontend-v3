'use client';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';
import { ACADEMIC_STATE_CHANGE_STATUS_OPTIONS } from '@/entities/setting';

import { RHFTabSelect } from '@/shared/ui';

export const AcademicStateChangeStatusField = () => {
  return (
    <RHFTabSelect
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState}
      label="본 학기 학적 상태"
      options={ACADEMIC_STATE_CHANGE_STATUS_OPTIONS}
      required
    />
  );
};
