'use client';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFTabSelect } from '@/shared/ui';

export const EnrollmentVerificationStateField = () => {
  return (
    <RHFTabSelect
      name={ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState}
      label="재학 분류"
      options={[
        { label: '재적 (휴학 포함)', value: '재적 (휴학 포함)' },
        { label: '졸업', value: '졸업' },
      ]}
      required
    />
  );
};
