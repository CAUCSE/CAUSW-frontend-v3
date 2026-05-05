import { Skeleton, VStack } from '@causw/cds';

export const AlumniContactsDetailMainLoadingView = () => {
  return (
    <VStack className="h-screen gap-4 bg-[linear-gradient(180deg,#4C688F_0%,#1E2E3F_410px,#fff_410px,#fff_100%)] p-6">
      <Skeleton height={80} width={80} className="rounded-lg" />
      <VStack className="gap-2">
        <Skeleton height={38} width={62} />
        <Skeleton height={24} width={200} />
      </VStack>
    </VStack>
  );
};
