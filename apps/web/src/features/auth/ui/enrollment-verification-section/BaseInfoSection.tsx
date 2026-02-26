import { Field, TextInput } from '@causw/cds';

interface BaseInfoSectionProps {
  userName: string;
}

export const BaseInfoSection = ({ userName }: BaseInfoSectionProps) => {
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
