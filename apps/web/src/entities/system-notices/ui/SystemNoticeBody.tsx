'use client';

import { Text, VStack } from '@causw/cds';

import { useLinkifiedText } from '@/shared/hooks';
import { sanitizeHtml } from '@/shared/lib/sanitizer';

interface SystemNoticeBodyProps {
  content: string;
  isHtml?: boolean;
}

export const SystemNoticeBody = ({
  content,
  isHtml = false,
}: SystemNoticeBodyProps) => {
  const sanitizedHtml = isHtml ? sanitizeHtml(content) : '';
  const { linkifiedContent } = useLinkifiedText({ content, isHtml });

  return (
    <VStack gap="sm" align="start">
      {isHtml ? (
        <Text
          as="div"
          typography="body-16-regular"
          textColor="gray-800"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          suppressHydrationWarning
          className="max-w-full overflow-x-auto break-all [&_a]:break-all [&_a]:text-blue-600 [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_table]:mr-0! [&_table]:w-full! [&_table]:max-w-none [&_table]:table-auto [&_table]:border-collapse [&_table]:break-all [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:break-normal [&_th]:border [&_th]:border-gray-200 [&_th]:px-3 [&_th]:py-2 [&_th]:break-normal [&_tr]:border [&_tr]:border-gray-200"
        />
      ) : (
        <Text
          as="p"
          typography="body-16-regular"
          textColor="gray-800"
          className="break-all whitespace-pre-wrap"
        >
          {linkifiedContent}
        </Text>
      )}
    </VStack>
  );
};
