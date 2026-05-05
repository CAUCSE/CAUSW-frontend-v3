'use client';

import { Field, TextInput } from '@causw/cds';

interface EnrollmentVerificationNameFieldProps {
  userName: string;
}

export const EnrollmentVerificationNameField = ({
  userName,
}: EnrollmentVerificationNameFieldProps) => {
  return (
    <Field disabled>
      <Field.Label>이름 (본명)</Field.Label>
      <TextInput
        className="bg-gray-200 text-gray-300"
        value={userName}
        readOnly
      />
    </Field>
  );
};
