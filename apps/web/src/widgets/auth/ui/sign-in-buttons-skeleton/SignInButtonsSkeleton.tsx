import { Skeleton, VStack } from '@causw/cds';

const BUTTON_SECTION_MIN_HEIGHT_CLASS = 'min-h-[252px]';

export const SignInButtonsSkeleton = () => {
  return (
    <VStack className={`w-full gap-3 ${BUTTON_SECTION_MIN_HEIGHT_CLASS}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} width="100%" height={54} radius="8" />
      ))}
    </VStack>
  );
};
