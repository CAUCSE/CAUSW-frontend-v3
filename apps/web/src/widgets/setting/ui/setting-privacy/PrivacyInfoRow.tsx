import { type ReactNode } from 'react';

import { Flex, Text } from '@causw/cds';

interface PrivacyInfoRowProps {
  label: string;
  value: ReactNode;
  action?: ReactNode;
}

export const PrivacyInfoRow = ({
  label,
  value,
  action,
}: PrivacyInfoRowProps) => (
  <Flex justify="between" align="center" className="w-full">
    <Text typography="body-16-medium" textColor="gray-500">
      {label}
    </Text>
    <Flex align="center" gap="sm">
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {value}
      </Text>
      {action}
    </Flex>
  </Flex>
);
