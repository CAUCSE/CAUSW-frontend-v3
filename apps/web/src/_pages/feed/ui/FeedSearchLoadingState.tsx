'use client';

type FeedSearchLoadingStateProps = {
  message: string;
};

export const FeedSearchLoadingState = ({
  message,
}: FeedSearchLoadingStateProps) => {
  return (
    <section className="px-4 py-10 text-center">
      <p className="typo-body-16-regular text-gray-500">{message}</p>
    </section>
  );
};
