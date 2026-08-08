'use client';

import { useEffect, useRef } from 'react';

import { Checkbox, HStack, Stack, Text } from '@causw/cds';

import { ReplyIndicator, type ReplyTarget } from '@/entities/comment';

import { useCommentForm } from '../model';

// iOS는 16px 미만 입력 요소 포커스 시 화면을 확대함. 1rem + scale로 15px 유지
const TEXTAREA_VISUAL_SCALE = 0.9375; // 15px / 16px
const TEXTAREA_LINE_HEIGHT = 25.6; // 1rem × leading-normal(1.6)
const TEXTAREA_MAX_LINES = 5;

interface CommentFormProps {
  postId: string;
  replyTarget: ReplyTarget;
  onCancelReply: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const CommentForm = ({
  postId,
  replyTarget,
  onCancelReply,
  inputRef,
}: CommentFormProps) => {
  const { content, setContent, isAnonymous, setIsAnonymous, handleSubmit } =
    useCommentForm({
      postId,
      replyTarget,
      onCancelReply,
    });

  const scaleWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    const wrapper = scaleWrapperRef.current;
    if (!el || !wrapper) return;

    el.style.height = 'auto';
    const maxHeight = TEXTAREA_LINE_HEIGHT * TEXTAREA_MAX_LINES;
    const height = Math.min(el.scrollHeight, maxHeight);
    el.style.height = height + 'px';
    wrapper.style.height = height * TEXTAREA_VISUAL_SCALE + 'px';
  }, [content, inputRef]);

  const handleSubmitWrapper = () => {
    const success = handleSubmit();
    if (success) inputRef.current?.focus();
  };

  return (
    <Stack gap="none" className="rounded-b-lg bg-white">
      <ReplyIndicator replyTarget={replyTarget} onCancel={onCancelReply} />

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

        <div ref={scaleWrapperRef} className="min-w-0 flex-1 overflow-hidden">
          <textarea
            ref={inputRef}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요!"
            className="font-regular block w-[106.6667%] origin-top-left scale-[0.9375] resize-none font-sans text-base leading-normal text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmitWrapper}
          disabled={!content.trim()}
          className="cursor-pointer"
        >
          {content.trim().length > 0 && (
            <Text typography="body-15-semibold" textColor="gray-800">
              등록
            </Text>
          )}
        </button>
      </HStack>
    </Stack>
  );
};
