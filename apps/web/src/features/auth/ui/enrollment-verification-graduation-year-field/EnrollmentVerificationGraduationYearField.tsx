'use client';

import { useWatch } from 'react-hook-form';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const EnrollmentVerificationGraduationYearField = () => {
  const enrollmentState = useWatch({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });

  if (enrollmentState !== '졸업') return null;

  return (
    <RHFInput
      label="졸업년도"
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear}
      placeholder="졸업년도를 입력해주세요."
    />
  );
};
