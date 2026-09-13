import { Text, VStack } from '@causw/cds';

import { LANDING_PROBLEM_CARDS } from '../../config';
import { LandingProblemCard } from '../landing-problem-card';
import { ScrollReveal } from '../scroll-reveal';

export const LandingProblem = () => {
  return (
    <VStack as="section" className="w-full" gap="lg">
      <Text
        as="h2"
        typography="title-24-bold"
        textColor="gray-800"
        className="desktop:text-5xl! whitespace-pre"
      >
        {'필요한 소식,\n여러 곳에서 찾고 있지 않나요?'}
      </Text>

      <ScrollReveal className="tablet:flex hidden w-full gap-4">
        {LANDING_PROBLEM_CARDS.map((card) => (
          <LandingProblemCard key={card.image} {...card} />
        ))}
      </ScrollReveal>
      <div className="tablet:hidden flex flex-col gap-18">
        {LANDING_PROBLEM_CARDS.map((card) => (
          <ScrollReveal key={card.image}>
            <LandingProblemCard {...card} />
          </ScrollReveal>
        ))}
      </div>
    </VStack>
  );
};
