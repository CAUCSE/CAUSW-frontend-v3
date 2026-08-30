import { Button, Text, VStack } from '@causw/cds';

import {
  LandingFeatures,
  LandingHero,
  LandingProblem,
} from '@/widgets/landing';

import { ScrollReveal } from '@/shared/ui';

export const LandingPage = () => {
  const LandingContents = [LandingHero, LandingProblem, LandingFeatures];

  return (
    <VStack className="min-h-full w-full items-center">
      <VStack className="desktop:gap-70 max-w-desktop tablet:px-10 relative w-full items-center gap-40 px-5">
        <header className="max-w-desktop fixed top-0 z-10 flex h-14 w-full items-center justify-end bg-white px-2.25">
          <Button
            type="button"
            className="rounded-sm bg-gray-700 px-3 py-2 hover:bg-gray-700!"
          >
            <Text typography="body-14-medium" textColor="white">
              웹 사이트 이용하기
            </Text>
          </Button>
        </header>
        {LandingContents.map((Content) => (
          <ScrollReveal key={Content.name} className="w-full">
            <Content />
          </ScrollReveal>
        ))}
      </VStack>
    </VStack>
  );
};
