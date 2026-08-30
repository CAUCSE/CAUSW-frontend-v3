import { Button, Text, VStack } from '@causw/cds';

import {
  LandingAlumniConnection,
  LandingClosingCTA,
  LandingFeatures,
  LandingFooter,
  LandingHero,
  LandingProblem,
} from '@/widgets/landing';

export const LandingPage = () => {
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
        <LandingHero />
        <LandingProblem />
        <LandingFeatures />
        <LandingAlumniConnection />
        <LandingClosingCTA />
        <LandingFooter />
      </VStack>
    </VStack>
  );
};
