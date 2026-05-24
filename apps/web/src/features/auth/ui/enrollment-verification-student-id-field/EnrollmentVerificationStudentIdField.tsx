'use client';

import { useWatch } from 'react-hook-form';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const EnrollmentVerificationStudentIdField = () => {
  const enrollmentState = useWatch({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });

  if (
    enrollmentState === ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value
  ) {
    return null;
  }

  return (
    <RHFInput
      label="학번"
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.studentId}
      placeholder="학번을 입력해주세요."
    />
  );
};
