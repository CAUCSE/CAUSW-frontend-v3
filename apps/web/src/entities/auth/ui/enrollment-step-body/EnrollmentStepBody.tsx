'use client';

import { Text } from '@causw/cds';

import type { StepCardData } from '@/entities/auth';

import { HighlightText } from '@/shared/ui';

interface EnrollmentStepBodyProps extends Pick<
  StepCardData,
  'state' | 'description' | 'highlightText'
> {
  rejectedReason?: string;
}

export const EnrollmentStepBody = ({
  state,
  description,
  highlightText,
  rejectedReason,
}: EnrollmentStepBodyProps) => {
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
