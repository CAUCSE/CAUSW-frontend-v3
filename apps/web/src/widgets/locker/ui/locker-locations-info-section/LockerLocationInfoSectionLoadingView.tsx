import { Skeleton, VStack } from '@causw/cds';

export const LockerLocationInfoSectionLoadingView = () => {
  return (
    <VStack gap="none" as="section" className="gap-2.5">
      <Skeleton height={28} width={200} />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height={183} className="w-full" />
      ))}
    </VStack>
  );
};
