'use client';

import { Text, Flex, Check, HStack, mergeStyles } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

export const EnrollmentStepCardHeader = ({
  stepNumber,
  title,
  statusLabel,
  state,
}: Pick<StepCardData, 'stepNumber' | 'title' | 'statusLabel' | 'state'>) => {
  const isLocked = state === 'locked';
  const isCompleted = state === 'completed';

  return (
    <HStack gap="sm" align="center" className="w-full">
      <Flex
        className={mergeStyles(
          'size-8 shrink-0 items-center justify-center rounded-full',
          isLocked ? 'bg-gray-100' : 'bg-blue-100',
        )}
      >
        {isCompleted ? (
          <Check className="fill-none" size={12} color="blue-700" />
        ) : (
          <Text
            typography="subtitle-16-bold"
            textColor={isLocked ? 'gray-400' : 'blue-700'}
          >
            {stepNumber}
          </Text>
        )}
      </Flex>
      <Text
        typography="subtitle-16-bold"
        textColor={isLocked ? 'gray-400' : 'gray-700'}
        className="flex-1"
      >
        {title}
      </Text>
      {statusLabel && (
        <Text
          typography="subtitle-16-bold"
          textColor={
            isCompleted ? 'blue-700' : isLocked ? 'gray-400' : 'blue-700'
          }
        >
          {statusLabel}
        </Text>
      )}
    </HStack>
  );
};
