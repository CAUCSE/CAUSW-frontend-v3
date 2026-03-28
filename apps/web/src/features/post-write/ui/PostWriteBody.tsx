'use client';

import { useEffect, useRef } from 'react';

import { ArrowDown, Chip, mergeStyles, TextArea, VStack } from '@causw/cds';

import { type Board } from '@/entities/feed';
import { type VoteWriteValue } from '@/entities/post';

import { VoteField } from './VoteField';

interface PostWriteBodyProps {
  onSelectorClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedBoard: Board | null;
  content: string;
  setContent: (content: string) => void;
  vote: VoteWriteValue | null;
  setVote: (vote: VoteWriteValue | null) => void;
  isEdit?: boolean;
}

export const PostWriteBody = ({
  onSelectorClick,
  selectedBoard,
  content,
  setContent,
  vote,
  setVote,
  isEdit,
}: PostWriteBodyProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  // 모달 진입 시 텍스트 끝에 포커스
  useEffect(() => {
    if (isEdit) {
      const el = textareaRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    }
  }, [isEdit]);

  return (
    <VStack
      gap="none"
      className="flex-1 overflow-y-auto"
      style={{
        scrollbarWidth: 'auto',
        msOverflowStyle: 'auto',
      }}
    >
      <Chip
        asChild
        color="lightgray"
        className={mergeStyles(
          'transition-color mx-4 w-fit shrink-0 md:mt-4',
          !isEdit ? 'cursor-pointer hover:bg-gray-200 active:bg-gray-200' : '',
        )}
      >
        <button onClick={onSelectorClick} disabled={isEdit}>
          {selectedBoard ? selectedBoard.name : '주제를 선택해주세요'}
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Chip>

      <VStack gap="lg" className="mx-5 my-4">
        <TextArea className="p-0 ring-0 focus-within:ring-0">
          <TextArea.Input
            ref={textareaRef}
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            resize={false}
            placeholder="내용을 입력해주세요."
            rows={1}
            className="min-h-0"
          />
        </TextArea>

        {vote && (
          <VoteField
            value={vote}
            onChange={setVote}
            onRemove={() => setVote(null)}
          />
        )}
      </VStack>
    </VStack>
  );
};
