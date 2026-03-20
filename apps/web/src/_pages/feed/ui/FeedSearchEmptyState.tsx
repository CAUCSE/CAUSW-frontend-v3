'use client';

import { CommentGrayColored, Pen } from '@causw/cds';

type FeedSearchEmptyStateProps =
  | {
      variant: 'recent';
      message: string;
      writePostLabel?: never;
      onWritePost?: never;
    }
  | {
      variant: 'search';
      message: string;
      writePostLabel: string;
      onWritePost: () => void;
    };

export const FeedSearchEmptyState = (props: FeedSearchEmptyStateProps) => {
  if (props.variant === 'recent') {
    return (
      <section className="tablet:pt-[120px] flex items-center justify-center px-4 pt-[142px] text-center">
        <div className="flex flex-col items-center gap-6">
          <CommentGrayColored size={56} />
          <p className="typo-body-16-regular text-gray-500">{props.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tablet:pt-[120px] flex items-center justify-center px-4 pt-[160px] text-center">
      <div className="flex w-[176px] flex-col items-center gap-8">
        <p className="typo-body-16-regular whitespace-pre-line text-gray-500">
          {props.message}
        </p>

        <button
          type="button"
          onClick={props.onWritePost}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700"
        >
          <Pen size={20} className="fill-white" />
          <span className="typo-subtitle-16-bold">{props.writePostLabel}</span>
        </button>
      </div>
    </section>
  );
};
