import { VStack } from '@causw/cds';

import {
  LandingAlumniConnection,
  LandingClosingCTA,
  LandingFeatures,
  LandingFooter,
  LandingHeader,
  LandingHero,
  LandingProblem,
} from '@/widgets/landing';

export const LandingPage = () => {
  return (
    <VStack className="min-h-full w-full items-center">
      <VStack className="desktop:gap-70 max-w-desktop tablet:px-10 relative w-full items-center gap-40 px-5">
        <LandingHeader />
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
