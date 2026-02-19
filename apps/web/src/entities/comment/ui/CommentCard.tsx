import { ReactNode } from 'react';

import { Avatar, Heart, HStack, Stack, Text } from '@causw/cds';

interface CommentCardProps {
  author: string;
  content: string;
  time: string;
  isBlocked?: boolean;
  isReply?: boolean;
  menuSlot?: ReactNode;
  onReplyClick?: () => void;
}

export const CommentCard = ({
  author,
  content,
  time,
  isBlocked,
  isReply,
  menuSlot,
  onReplyClick,
}: CommentCardProps) => {
  return (
    <article className={`bg-white px-5 py-3 ${isReply && 'pl-12'}`}>
      <HStack align={isBlocked ? 'center' : 'start'} className="gap-3">
        <Avatar size="xs" className="my-1" />

        {isBlocked ? (
          // 차단된 사용자의 댓글
          <Text typography="body-16-regular" textColor="gray-400">
            차단된 사용자의 댓글입니다
          </Text>
        ) : (
          // 차단되지 않은 경우
          <Stack className="w-full gap-3">
            <Stack gap="none">
              <HStack align="center" justify="between">
                <HStack gap="sm" align="center">
                  <Text typography="body-15-semibold" textColor="gray-800">
                    {author}
                  </Text>
                  <Text typography="body-15-regular" textColor="gray-500">
                    {time}
                  </Text>
                </HStack>

                {menuSlot}
              </HStack>
              <Text
                typography="body-15-regular"
                textColor="gray-800"
                className="whitespace-pre-wrap"
              >
                {content}
              </Text>
            </Stack>

            <HStack align="center" justify="between">
              <button
                type="button"
                onClick={onReplyClick}
                className="cursor-pointer"
              >
                <Text typography="body-14-medium" textColor="gray-400">
                  답글달기
                </Text>
              </button>

              <HStack as="button" align="center" className="gap-1.5">
                <Heart size={16} color="gray-200" />
                <Text typography="body-14-medium" textColor="gray-400">
                  {3}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        )}
      </HStack>
    </article>
  );
};
