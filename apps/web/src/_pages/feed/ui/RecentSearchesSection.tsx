'use client';

import { Chip, Close } from '@causw/cds';

type RecentSearchesSectionProps = {
  recentSearches: string[];
  title: string;
  clearAllLabel: string;
  removeSuffix: string;
  onClickItem: (keyword: string) => void;
  onRemoveItem: (keyword: string) => void;
  onClearAll: () => void;
};

export const RecentSearchesSection = ({
  recentSearches,
  title,
  clearAllLabel,
  removeSuffix,
  onClickItem,
  onRemoveItem,
  onClearAll,
}: RecentSearchesSectionProps) => {
  return (
    <section className="tablet:px-1 px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="typo-subtitle-16-bold text-gray-700">{title}</h2>

        <button
          type="button"
          onClick={onClearAll}
          className="text-[15px] leading-6 font-medium tracking-[-0.02em] text-gray-400"
        >
          {clearAllLabel}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {recentSearches.map((recentKeyword) => (
          <Chip
            key={recentKeyword}
            size="md"
            color="white"
            asChild
            className="rounded-md"
          >
            <button
              type="button"
              className="gap-1.5"
              onClick={() => onClickItem(recentKeyword)}
            >
              <span className="text-[15px] leading-6 font-medium tracking-[-0.02em] text-gray-700">
                {recentKeyword}
              </span>
              <span
                aria-label={`${recentKeyword} ${removeSuffix}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveItem(recentKeyword);
                }}
              >
                <Close size={14} color="gray-400" />
              </span>
            </button>
          </Chip>
        ))}
      </div>
    </section>
  );
};
