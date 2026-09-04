import { Text, VStack } from '@causw/cds';

import { LANDING_ALUMNI_CONNECTION_CARDS } from '../../config';
import { LandingAlumniConnectionCard } from '../landing-alumni-connection-card';
import { ScrollReveal } from '../scroll-reveal';

export const LandingAlumniConnection = () => {
  return (
    <VStack as="section" className="w-full" gap="lg">
      <Text
        as="h2"
        typography="title-24-bold"
        textColor="gray-800"
        className="desktop:text-5xl! whitespace-pre"
      >
        {'학교를 넘어,\n서로의 경험이 이어지도록'}
      </Text>
      <VStack className="tablet:gap-30 w-full gap-18">
        {LANDING_ALUMNI_CONNECTION_CARDS.map((card) => (
          <ScrollReveal key={card.image}>
            <LandingAlumniConnectionCard {...card} />
          </ScrollReveal>
        ))}
      </VStack>
    </VStack>
  );
};
