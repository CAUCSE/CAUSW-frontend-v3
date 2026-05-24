'use client';

import { Button, Chip, Close } from '@causw/cds';

import { useFeedRecentSearchKeywordChip } from '../../model';

interface FeedRecentSearchKeywordChipProps {
  keyword: string;
  index: number;
}

export const FeedRecentSearchKeywordChip = ({
  keyword,
  index,
}: FeedRecentSearchKeywordChipProps) => {
  const { handleClickRecentSearchKeyword, handleRemoveRecentSearchKeyword } =
    useFeedRecentSearchKeywordChip({
      keyword,
    });

  return (
    <div className="relative">
      <Button
        className="h-fit w-fit p-0"
        onClick={handleClickRecentSearchKeyword}
      >
        <Chip size="md" color="white" className="cursor-pointer pr-8">
          {keyword}
        </Chip>
      </Button>
      <Button
        className="group absolute top-1/2 right-3 h-fit w-fit -translate-y-1/2 bg-transparent p-0 hover:bg-transparent!"
        onClick={(event) => handleRemoveRecentSearchKeyword(event, index)}
      >
        <Close size={14} color="gray-400" className="group-hover:hidden" />
        <Close
          size={14}
          color="gray-600"
          className="hidden group-hover:block"
        />
      </Button>
    </div>
  );
};
