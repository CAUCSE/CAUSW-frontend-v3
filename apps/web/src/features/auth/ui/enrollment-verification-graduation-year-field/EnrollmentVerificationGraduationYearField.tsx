'use client';

import { useWatch } from 'react-hook-form';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const EnrollmentVerificationGraduationYearField = () => {
  const enrollmentState = useWatch({
    name: ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState,
  });

  if (
    enrollmentState !== ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value
  ) {
    return null;
  }

  return (
    <RHFInput
      label="졸업 연도"
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear}
      placeholder="졸업 연도를 입력해 주세요."
      className="placeholder:font-sans placeholder:text-[16px] placeholder:leading-[1.5] placeholder:font-normal placeholder:tracking-[-0.02em] placeholder:text-gray-400"
    />
  );
};
