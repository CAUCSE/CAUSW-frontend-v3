import React from 'react';

import { CaldendarIconColored, Text, VStack } from '@causw/cds';

interface EmptyStateViewProps {
  message: string;
  icon?: React.ReactNode;
  iconSize?: number;
  className?: string;
}

export function EmptyStateView({
  message,
  icon,
  iconSize = 48,
  className,
}: EmptyStateViewProps) {
  return (
    <VStack
      className={`items-center justify-center gap-4 rounded-xl bg-gray-50 py-5 ${className}`}
    >
      {icon ? (
        icon
      ) : (
        <CaldendarIconColored size={iconSize} className="gray-800 grayscale" />
      )}

      <Text typography="body-14-medium" textColor="gray-400">
        {message}
      </Text>
    </VStack>
  );
}
