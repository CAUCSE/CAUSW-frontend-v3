'use client';

import { Text, CTAButton, Flex, Check, HStack, mergeStyles } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

import { HighlightText } from '@/shared/ui';

interface EnrollmentStepCardProps extends StepCardData {
  onAction?: () => void;
  rejectedReason?: string;
}

const EnrollmentStepCardHeader = ({
  stepNumber,
  title,
  statusLabel,
  state,
}: Pick<
  EnrollmentStepCardProps,
  'stepNumber' | 'title' | 'statusLabel' | 'state'
>) => {
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

const EnrollmentStepBody = ({
  state,
  description,
  highlightText,
  rejectedReason,
}: Pick<
  EnrollmentStepCardProps,
  'state' | 'description' | 'highlightText' | 'rejectedReason'
>) => {
  if (state !== 'active' || !description) return null;

  return (
    <div className="px-2">
      {highlightText ? (
        <HighlightText
          text={description}
          highlight={highlightText}
          typography="body-15-medium"
          textColor="gray-500"
          highlightColor="blue-700"
        />
      ) : (
        <Text
          typography="body-15-medium"
          textColor="gray-500"
          className="leading-relaxed whitespace-pre-wrap"
        >
          {description}
        </Text>
      )}
      {rejectedReason && (
        <Text
          typography="body-15-medium"
          className="leading-relaxed text-[#FD5C5F]"
        >
          ({rejectedReason})
        </Text>
      )}
    </div>
  );
};

const EnrollmentStepActionButton = ({
  state,
  buttonLabel,
  onAction,
}: Pick<EnrollmentStepCardProps, 'state' | 'buttonLabel' | 'onAction'>) => {
  if (state !== 'active' || !buttonLabel) return null;

  return (
    <CTAButton color="blue" fullWidth onClick={onAction}>
      {buttonLabel}
    </CTAButton>
  );
};

export const EnrollmentStepCard = ({
  stepNumber,
  title,
  state,
  statusLabel,
  description,
  highlightText,
  rejectedReason,
  buttonLabel,
  onAction,
}: EnrollmentStepCardProps) => {
  return (
    <div
      className={mergeStyles(
        'flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4',
        state === 'active' && 'border-2 border-blue-700',
      )}
    >
      <EnrollmentStepCardHeader
        stepNumber={stepNumber}
        title={title}
        state={state}
        statusLabel={statusLabel}
      />

      <EnrollmentStepBody
        state={state}
        description={description}
        highlightText={highlightText}
        rejectedReason={rejectedReason}
      />

      <EnrollmentStepActionButton
        state={state}
        buttonLabel={buttonLabel}
        onAction={onAction}
      />
    </div>
  );
};
