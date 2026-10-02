'use client';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const EnrollmentVerificationEnrollmentYearField = () => {
  return (
    <RHFInput
      label="입학 연도"
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear}
      placeholder="입학 연도를 입력해 주세요."
    />
  );
};
