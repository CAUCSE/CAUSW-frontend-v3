'use client';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS_OPTIONS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth';

import { RHFTabSelect } from '@/shared/ui';

export const EnrollmentVerificationStateField = () => {
  return (
    <RHFTabSelect
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState}
      label="재학 분류"
      options={ENROLLMENT_VERIFICATION_ACADEMIC_STATUS_OPTIONS}
      required
    />
  );
};
