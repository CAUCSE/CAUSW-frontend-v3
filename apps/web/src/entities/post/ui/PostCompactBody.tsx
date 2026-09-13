import Image from 'next/image';

import { HStack, Text, VStack } from '@causw/cds';

import { awsImageLoader } from '@/shared/lib';
import { stripHtml } from '@/shared/lib/sanitizer';

interface PostCompactBodyProps {
  title: string | null;
  content: string;
  images?: string[];
  isHtml?: boolean;
}

export const PostCompactBody = ({
  title,
  content,
  images = [],
  isHtml,
}: PostCompactBodyProps) => {
  const thumbnailUrl = images[0];
  const contentPreview = isHtml ? stripHtml(content) : content;

  return (
    <HStack gap="sm" justify="between" className="mt-1.5 mb-2">
      <VStack gap="none" className="min-w-0 flex-1">
        {title?.trim() && (
          <Text
            typography="body-15-semibold"
            textColor="gray-800"
            className="w-full truncate"
          >
            {title}
          </Text>
        )}
        <Text
          typography="body-14-regular"
          textColor="gray-700"
          className="w-full truncate"
        >
          {contentPreview}
        </Text>
      </VStack>

      {thumbnailUrl && (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm">
          <Image
            loader={awsImageLoader}
            src={thumbnailUrl}
            alt=""
            fill
            sizes="3rem"
            className="object-cover"
          />
        </div>
      )}
    </HStack>
  );
};
