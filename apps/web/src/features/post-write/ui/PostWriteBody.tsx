'use client';

import { useEffect, useRef } from 'react';

import { ArrowDown, Chip, TextArea, VStack } from '@causw/cds';

import { VoteWriteValue } from '@/entities/post';

import { VoteField } from './VoteField';

interface PostWriteBodyProps {
  onSelectorClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory: string | null;
  content: string;
  setContent: (content: string) => void;
  vote: VoteWriteValue | null;
  setVote: (vote: VoteWriteValue | null) => void;
}

export const PostWriteBody = ({
  onSelectorClick,
  selectedCategory,
  content,
  setContent,
  vote,
  setVote,
}: PostWriteBodyProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (value: string) => {
    setContent(value);

    const el = textareaRef.current;
    if (!el) return;

    // 높이 초기화 후 scrollHeight만큼 다시 설정
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  // 최초 렌더 시에도 맞춰주기
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

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
        className="transition-color mx-4 w-fit shrink-0 cursor-pointer hover:bg-gray-200 active:bg-gray-200 md:mt-4"
      >
        <button onClick={onSelectorClick}>
          {selectedCategory ? selectedCategory : '주제를 선택해주세요'}{' '}
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
            placeholder="내용을 입력하세요"
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
