import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

import { ScrollReveal } from '@/shared/ui';

import { LandingStoreCTA } from '../landing-store-cta';

export const LandingClosingCTA = () => {
  return (
    <ScrollReveal className="w-full">
      <VStack as="section" className="desktop:gap-8 w-full items-center gap-6">
        <Image
          src="/images/landing/brand/ccssww-profile.svg"
          alt="크자회"
          width={56}
          height={56}
        />
        <VStack className="w-full items-center text-center" gap="xs">
          <Text
            as="h2"
            typography="title-24-bold"
            textColor="gray-800"
            className="desktop:text-6xl! whitespace-pre"
          >
            {'동문과 연결되고,\n학부생활은 더 편리하게'}
          </Text>
          <Text
            typography="body-15-medium"
            textColor="gray-500"
            className="desktop:text-3xl!"
          >
            웹으로도 크자회를 이용할 수 있어요.
          </Text>
        </VStack>
        <LandingStoreCTA placement="closing_cta" />
      </VStack>
    </ScrollReveal>
  );
};
