'use client';

import { Text, CTAButton, Flex } from '@causw/cds';
import { SuccessColored } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

import { HighlightText } from '@/shared';

interface EnrollmentStepCardProps extends StepCardData {
  onAction?: () => void;
}

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
  if (state === 'completed') {
    return (
      <div className="flex items-center justify-between overflow-hidden rounded-lg bg-white p-4">
        <Flex gap="sm" align="center" className="flex-1">
          <div className="flex size-8 shrink-0 items-center justify-center">
            {/* TODO: 아이콘 변경 */}
            <SuccessColored size={32} />
          </div>
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="flex-1"
          >
            {title}
          </Text>
        </Flex>
        <Text typography="subtitle-16-bold" textColor="blue-700">
          완료
        </Text>
      </div>
    );
  }

  if (state === 'locked') {
    return (
      <div className="flex flex-col items-start overflow-hidden rounded-lg bg-white p-4">
        <Flex gap="sm" align="center" className="h-8">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Text typography="subtitle-16-bold" textColor="blue-700">
              {stepNumber}
            </Text>
          </div>
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="flex-1"
          >
            {title}
          </Text>
        </Flex>
      </div>
    );
  }

  // active state
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-blue-700 bg-white p-4">
      {/* 헤더 */}
      <Flex gap="sm" align="center" className="w-full">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Text typography="subtitle-16-bold" textColor="blue-700">
            {stepNumber}
          </Text>
        </div>
        <Text
          typography="subtitle-16-bold"
          textColor="gray-700"
          className="flex-1"
        >
          {title}
        </Text>
        {statusLabel && (
          <Text typography="subtitle-16-bold" textColor="blue-700">
            {statusLabel}
          </Text>
        )}
      </Flex>

      {/* 설명 텍스트 */}
      {description && (
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
      )}

      {/* 액션 버튼 */}
      {buttonLabel && (
        <CTAButton color="light" fullWidth onClick={onAction}>
          {buttonLabel}
        </CTAButton>
      )}
    </div>
  );
};
