'use client';

import { useEffect } from 'react';

import { Checkbox, HStack, Stack, Text } from '@causw/cds';

import { ReplyPreview, ReplyTarget } from '@/entities/comment';

import { useCommentForm } from '../model';

interface CommentFormProps {
  replyTarget: ReplyTarget;
  onCancelReply: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const CommentForm = ({
  replyTarget,
  onCancelReply,
  inputRef,
}: CommentFormProps) => {
  const { text, setText, isAnonymous, setIsAnonymous, handleSubmit } =
    useCommentForm({
      replyTarget,
      onCancelReply,
    });

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const lineHeight = 24; // leading-normal
    const maxHeight = lineHeight * 5;
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
  }, [text, inputRef]);

  const handleSubmitWrapper = () => {
    const success = handleSubmit();
    if (success) inputRef.current?.focus();
  };

  return (
    <Stack gap="none" className="rounded-b-lg bg-white">
      <ReplyPreview replyTarget={replyTarget} onCancel={onCancelReply} />

      <HStack
        gap="sm"
        align="start"
        className="m-3 rounded-lg bg-gray-100 px-4 py-3"
      >
        <Checkbox
          checked={isAnonymous}
          onCheckedChange={(v) => setIsAnonymous(v as boolean)}
          className="flex items-center gap-1"
        >
          <Checkbox.Indicator />
          <Checkbox.Label
            typography="body-15-semibold"
            textColor={isAnonymous ? 'gray-800' : 'gray-400'}
          >
            익명
          </Checkbox.Label>
        </Checkbox>

        <textarea
          ref={inputRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력해주세요!"
          className="font-regular max-h-30 flex-1 resize-none font-sans text-sm leading-normal text-gray-800 placeholder-gray-400 outline-none"
        />

        <button
          type="button"
          onClick={handleSubmitWrapper}
          disabled={!text.trim()}
          className="cursor-pointer"
        >
          {text.trim().length > 0 && (
            <Text typography="body-15-semibold" textColor="gray-800">
              등록
            </Text>
          )}
        </button>
      </HStack>
    </Stack>
  );
};
