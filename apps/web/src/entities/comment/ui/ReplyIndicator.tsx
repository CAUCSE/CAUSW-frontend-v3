import { Close, HStack, Stack, Text } from '@causw/cds';

import { type ReplyTarget } from '../model';

interface ReplyIndicatorProps {
  replyTarget: ReplyTarget;
  onCancel: () => void;
}

export const ReplyIndicator = ({
  replyTarget,
  onCancel,
}: ReplyIndicatorProps) => {
  if (!replyTarget) return null;

  return (
    <HStack
      gap="none"
      align="start"
      className="border-t border-gray-200 px-4 pt-3"
    >
      <Stack gap="none" className="w-full">
        <Text typography="body-15-regular" textColor="gray-400">
          {replyTarget.author}님에게 답글을 남기는 중
        </Text>
        <Text
          typography="body-15-regular"
          textColor="gray-800"
          className="truncate"
        >
          {replyTarget.content}
        </Text>
      </Stack>
      <button
        onClick={onCancel}
        className="cursor-pointer transition-opacity hover:opacity-70 active:opacity-70"
      >
        <Close size={16} color="gray-400" />
      </button>
    </HStack>
  );
};
