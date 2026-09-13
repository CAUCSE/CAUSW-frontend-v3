'use client';

import { Button, Chip, Close } from '@causw/cds';

import { type BoardGroup } from '@/entities/board';

import { useRecentSearchKeywordChip } from '../../model';

interface RecentSearchKeywordChipProps {
  boardGroup: BoardGroup;
  keyword: string;
  index: number;
}

export const RecentSearchKeywordChip = ({
  boardGroup,
  keyword,
  index,
}: RecentSearchKeywordChipProps) => {
  const { handleClickRecentSearchKeyword, handleRemoveRecentSearchKeyword } =
    useRecentSearchKeywordChip({
      boardGroup,
      keyword,
    });

  return (
    <div className="relative">
      <Button
        color="white"
        className="h-fit w-fit rounded-md p-0"
        onClick={handleClickRecentSearchKeyword}
      >
        <Chip size="md" color="lightgray" className="cursor-pointer pr-8">
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
