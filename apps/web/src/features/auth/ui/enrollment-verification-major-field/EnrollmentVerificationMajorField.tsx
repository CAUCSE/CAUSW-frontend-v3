'use client';

import {
  ENROLLMENT_VERIFICATION_DEPARTMENT_OPTIONS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth';

import { RHFTabSelect } from '@/shared/ui';

export const EnrollmentVerificationMajorField = () => {
  return (
    <RHFTabSelect
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.major}
      label="학과(부)"
      options={ENROLLMENT_VERIFICATION_DEPARTMENT_OPTIONS}
      required
    />
  );
};
