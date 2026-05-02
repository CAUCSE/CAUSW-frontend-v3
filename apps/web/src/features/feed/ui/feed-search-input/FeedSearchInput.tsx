'use client';

import { Button, CloseFilled, Search, TextInput } from '@causw/cds';

import { useFeedSearchInput } from '../../model';

export const FeedSearchInput = () => {
  const {
    currentKeyword,
    handleInitialFocus,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleTextInputChange,
    handleClearKeyword,
  } = useFeedSearchInput();

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
      placeholder="글 제목, 내용을 검색해보세요"
      className="mx-5 md:mx-0 [&>span]:flex [&>span]:items-center"
      value={currentKeyword}
      onChange={handleTextInputChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleEnterPress}
      ref={handleInitialFocus}
    />
  );
};
