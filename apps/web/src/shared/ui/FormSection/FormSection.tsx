import { HStack, Text, VStack } from '@causw/cds';

interface FormSectionProps {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}

export const FormSection = ({
  title,
  optional,
  children,
}: FormSectionProps) => (
  <VStack gap="sm">
    <HStack gap="xs" align="center" className="px-1">
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {title}
      </Text>
      {optional && (
        <Text typography="subtitle-16-bold" textColor="gray-400">
          (선택)
        </Text>
      )}
    </HStack>
    {children}
  </VStack>
);
