import { HStack, Skeleton, VStack, Grid } from '@causw/cds';

export const MyAlumniContactsMainLoadingView = () => {
  return (
    <>
      <VStack className="bg-white md:rounded-t-lg md:border md:border-b-0 md:border-gray-200">
        <VStack gap="lg" className="p-4 pt-2 md:px-5 md:pt-7">
          <VStack gap="md">
            <HStack gap="md" className="items-center">
              <Skeleton height={64} width={64} className="rounded-lg" />
              <VStack gap="sm">
                <Skeleton height={24} width={120} />
                <Skeleton height={18} width={180} />
              </VStack>
            </HStack>
            <Skeleton height={18} width="100%" maxWidth={320} />
          </VStack>
          <Grid columns={2} gap="sm">
            <Skeleton height={48} className="rounded-md" />
            <Skeleton height={48} className="rounded-md" />
          </Grid>
        </VStack>
      </VStack>
      <VStack className="grow bg-white px-6 py-4 md:rounded-b-lg md:border md:border-t-0 md:border-gray-200">
        <Skeleton
          height="100%"
          width="100%"
          minHeight={400}
          className="rounded-lg"
        />
      </VStack>
    </>
  );
};
