import { useEffect, useState } from 'react';

import { Checkbox, Close, HStack, Stack, Text } from '@causw/cds';

import { ReplyTarget } from '@/entities';

interface CommentInputProps {
  replyTarget: ReplyTarget;
  onCancelReply: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const CommentInput = ({
  replyTarget,
  onCancelReply,
  inputRef,
}: CommentInputProps) => {
  const [text, setText] = useState(''); // 댓글 입력 상태 관리
  const [checked, setChecked] = useState(true); // 익명 체크 상태 관리

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = 'auto'; // 먼저 초기화
    const lineHeight = 24; // leading-normal 기준 대략 24px (조정 가능)
    const maxHeight = lineHeight * 5;
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
  }, [text, inputRef]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    // TODO: replyTarget이 있으면 대댓글 API 호출, 없으면 일반 댓글 API 호출
    console.log('등록:', text, checked, replyTarget);
    setText('');
    onCancelReply(); // 등록 후 답글 모드 초기화

    inputRef.current?.focus();
  };

  return (
    <Stack gap="none" className="rounded-b-lg bg-white">
      {/* 답글 작성 중일 때 나타나는 UI */}
      {replyTarget && (
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
          <button onClick={onCancelReply} className="cursor-pointer">
            <Close size={16} color="gray-400" />
          </button>
        </HStack>
      )}

      <HStack
        gap="sm"
        align="start"
        className="m-3 rounded-lg bg-gray-100 px-4 py-3"
      >
        {/* 1. 익명 체크박스 (기존 컴포넌트 활용 가정) */}
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked as boolean)}
          className="flex items-center gap-1"
        >
          <Checkbox.Indicator />
          <Checkbox.Label
            typography="body-15-semibold"
            textColor={checked ? 'gray-800' : 'gray-400'}
          >
            익명
          </Checkbox.Label>
        </Checkbox>

        {/* 2. 텍스트 인풋 */}
        <textarea
          ref={inputRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력해주세요!"
          className="font-regular max-h-30 flex-1 resize-none font-sans text-sm leading-normal text-gray-800 placeholder-gray-400 outline-none"
        />

        {/* 3. 등록 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()} // 내용 없으면 버튼 비활성화 (선택 사항)
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
