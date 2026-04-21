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
  <Flex justify="between" align="center" className="w-full gap-3">
    <Text typography="body-16-medium" textColor="gray-500" className="shrink-0">
      {label}
    </Text>
    <Flex align="center" gap="sm" className="min-w-0 flex-1 justify-end">
      <Text
        typography="subtitle-16-bold"
        textColor="gray-700"
        className="min-w-0 truncate text-right"
      >
        {value}
      </Text>
      {action}
    </Flex>
  </Flex>
);
