'use client';

import { Button, CloseFilled, Search, TextInput } from '@causw/cds';

import { type BoardGroup } from '@/entities/feed';

import { useSearchInput } from '../../model';

interface SearchInputProps {
  boardGroup: BoardGroup;
  placeholder?: string;
}

export const SearchInput = ({
  boardGroup,
  placeholder = '글 제목, 내용을 검색해보세요',
}: SearchInputProps) => {
  const {
    currentKeyword,
    handleInitialFocus,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleTextInputChange,
    handleClearKeyword,
  } = useSearchInput({ boardGroup });

  return (
    <TextInput
      leftIcon={<Search size={20} color="gray-400" />}
      rightIcon={
        currentKeyword.length > 0 && (
          <Button
            className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
            onClick={handleClearKeyword}
          >
            <CloseFilled size={20} color="gray-400" />
          </Button>
        )
      }
      placeholder={placeholder}
      className="placeholder:typo-body-16-regular mx-4 mb-2 bg-gray-100 px-4 py-2.5 text-gray-400 [&>span]:flex [&>span]:items-center"
      value={currentKeyword}
      onChange={handleTextInputChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleEnterPress}
      ref={handleInitialFocus}
    />
  );
};
