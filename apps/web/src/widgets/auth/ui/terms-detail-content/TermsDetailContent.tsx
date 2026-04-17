'use client';

import { Close, HStack, Text, VStack } from '@causw/cds';

import type { TermResponseDto } from '@/entities/auth';

import { DesktopOnly } from '@/shared/ui';

export type TermsDetailContentTerm = Pick<
  TermResponseDto,
  'title' | 'effectiveDate' | 'content'
>;

interface TermsDetailContentProps {
  term: TermsDetailContentTerm;
  onClose: () => void;
}

export const TermsDetailContent = ({
  term,
  onClose,
}: TermsDetailContentProps) => {
  return (
    <>
      <VStack className="shrink-0 gap-1 px-4 py-4 md:px-8 md:pt-8 md:pb-4">
        <HStack justify="between">
          <Text typography="subtitle-18-bold" textColor="gray-800">
            {term.title}
          </Text>
          <DesktopOnly>
            <Close
              onClick={onClose}
              color="gray-600"
              className="cursor-pointer hover:fill-gray-400"
            />
          </DesktopOnly>
        </HStack>
        <Text typography="body-14-medium" textColor="gray-500">
          시행일 {term.effectiveDate}
        </Text>
      </VStack>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 md:px-8 md:pb-8">
        <Text
          typography="body-15-medium"
          textColor="gray-700"
          className="leading-7 whitespace-pre-wrap"
        >
          {term.content}
        </Text>
      </div>
    </>
  );
};
