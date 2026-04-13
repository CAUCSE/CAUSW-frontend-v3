import { Skeleton, VStack } from '@causw/cds';

export const AlumniContactsDetailMainLoadingView = () => {
  return (
    <VStack className="h-screen gap-4 p-6">
      <Skeleton height={80} width={80} className="rounded-lg" />
      <VStack className="gap-2">
        <Skeleton height={38} width={62} />
        <Skeleton height={24} width={200} />
      </VStack>
    </VStack>
  );
};
