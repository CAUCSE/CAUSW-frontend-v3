import { HStack, Text, VStack } from '@causw/cds';

import { type CrawledAttachment } from '../model';

interface PostOriginalLinkAndAttachedFilesProps {
  originalWriter: string;
  originalUrl?: string;
  attachedFiles?: CrawledAttachment[];
}

export const PostOriginalLinkAndAttachedFiles = ({
  originalWriter,
  originalUrl,
  attachedFiles,
}: PostOriginalLinkAndAttachedFilesProps) => {
  if (!originalUrl && !attachedFiles?.length) {
    return null;
  }

  return (
    <VStack gap="xs" className="mt-4 border-y border-gray-100 py-3">
      {originalUrl && (
        <HStack gap="xs">
          <Text
            typography="body-14-regular"
            textColor="gray-500"
            className="shrink-0"
          >
            🔗 원본 공지사항 :
          </Text>
          <Text
            as="a"
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            typography="body-14-regular"
            textColor="blue-500"
            className="cursor-pointer"
          >
            {originalWriter}
          </Text>
        </HStack>
      )}
      {!!attachedFiles?.length && (
        <HStack gap="xs">
          <Text
            typography="body-14-regular"
            textColor="gray-500"
            className="shrink-0"
          >
            🔗 첨부파일 :
          </Text>
          <VStack gap="none">
            {attachedFiles.map((file) => (
              <Text
                key={file.url}
                as="a"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                typography="body-14-regular"
                textColor="blue-500"
                className="cursor-pointer"
              >
                {file.name}
              </Text>
            ))}
          </VStack>
        </HStack>
      )}
    </VStack>
  );
};
