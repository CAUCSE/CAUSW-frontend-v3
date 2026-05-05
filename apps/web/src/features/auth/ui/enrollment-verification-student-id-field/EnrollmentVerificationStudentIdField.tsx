'use client';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const EnrollmentVerificationStudentIdField = () => {
  return (
    <RHFInput
      label="학번"
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.studentId}
      placeholder="학번을 입력해주세요."
    />
  );
};
