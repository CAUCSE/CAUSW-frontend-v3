'use client';

import { type ChangeEvent, type KeyboardEvent } from 'react';

import { Button, CloseFilled, Search, TextInput } from '@causw/cds';

type FeedSearchInputProps = {
  keyword: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSubmit: () => void;
};

export const FeedSearchInput = ({
  keyword,
  placeholder,
  onChange,
  onClear,
  onSubmit,
}: FeedSearchInputProps) => {
  const hasKeyword = keyword.trim().length > 0;

  return (
    <TextInput
      value={keyword}
      onChange={onChange}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
      }}
      leftIcon={<Search size={20} color="gray-400" />}
      rightIcon={
        hasKeyword ? (
          <Button
            className="mt-0 mb-auto h-fit w-fit place-self-center self-center border-none bg-transparent p-0 hover:bg-transparent!"
            onClick={onClear}
          >
            <CloseFilled size={20} color="gray-400" />
          </Button>
        ) : undefined
      }
      placeholder={placeholder}
      className="placeholder:typo-body-16-regular border-none! text-gray-800 shadow-none! ring-0! outline-none! [&>span]:flex [&>span]:items-center"
    />
  );
};
