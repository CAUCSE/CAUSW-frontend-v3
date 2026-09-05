import { Text, VStack } from '@causw/cds';

import { LANDING_FEATURE_CARDS } from '../../config';
import { LandingFeatureCard } from '../landing-feature-card/LandingFeatureCard';
import { ScrollReveal } from '../scroll-reveal';

export const LandingFeatures = () => {
  return (
    <VStack as="section" className="w-full" gap="lg">
      <Text
        as="h2"
        typography="title-24-bold"
        textColor="gray-800"
        className="desktop:text-5xl! whitespace-pre"
      >
        {'크자회 하나로 만나는\n학교 안팎의 모든 소식'}
      </Text>
      <VStack className="tablet:gap-30 w-full gap-18">
        {LANDING_FEATURE_CARDS.map((card) => (
          <ScrollReveal key={card.image}>
            <LandingFeatureCard {...card} />
          </ScrollReveal>
        ))}
      </VStack>
    </VStack>
  );
};
