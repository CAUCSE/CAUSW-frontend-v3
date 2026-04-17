import { Skeleton, VStack } from '@causw/cds';

export const AlumniContactsEditFormLoadingView = () => {
  return (
    <VStack gap="none" className="h-screen rounded-lg">
      <VStack className="h-100 rounded-t-lg bg-linear-to-b from-[#4C688F] to-[#1E2E3F] px-6 pt-24.75">
        <Skeleton height={80} width={80} className="rounded-lg" />
        <VStack className="gap-2">
          <Skeleton height={38} width={62} />
          <Skeleton height={24} width={200} />
        </VStack>
      </VStack>
      <VStack className="grow rounded-b-lg bg-white" />
    </VStack>
  );
};
