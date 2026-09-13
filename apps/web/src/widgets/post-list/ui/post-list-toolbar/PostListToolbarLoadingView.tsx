import { HStack, Skeleton } from '@causw/cds';

export const PostListToolbarLoadingView = () => {
  return (
    <HStack align="center" gap="md" className="px-4 py-1 md:px-0">
      <Skeleton width={38} height={22} className="rounded-md" />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      <HStack gap="sm" align="center">
        <Skeleton width={48} height={30} className="rounded-md" />
        <Skeleton width={64} height={30} className="rounded-md" />
        <Skeleton width={56} height={30} className="rounded-md" />
      </HStack>
    </HStack>
  );
};
