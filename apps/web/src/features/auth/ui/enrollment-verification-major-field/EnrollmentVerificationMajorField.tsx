'use client';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFTabSelect } from '@/shared/ui';

export const EnrollmentVerificationMajorField = () => {
  return (
    <RHFTabSelect
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.major}
      label="학과(부)"
      options={[
        { label: '전산학과', value: '전산학과' },
        { label: '컴퓨터공학과', value: '컴퓨터공학과' },
        { label: '컴퓨터공학부', value: '컴퓨터공학부' },
        { label: '소프트웨어학부', value: '소프트웨어학부' },
        { label: 'AI학과', value: 'AI학과' },
      ]}
      required
    />
  );
};
