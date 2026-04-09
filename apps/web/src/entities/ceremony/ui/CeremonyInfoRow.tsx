import { Text } from '@causw/cds';

interface CeremonyInfoRowProps {
  label: string;
  value: string;
}

export const CeremonyInfoRow = ({ label, value }: CeremonyInfoRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <Text typography="body-16-medium" textColor="gray-500">
        {label}
      </Text>
      <Text
        typography="subtitle-16-bold"
        textColor="gray-700"
        className="wrap-break-word"
      >
        {value}
      </Text>
    </div>
  );
};
