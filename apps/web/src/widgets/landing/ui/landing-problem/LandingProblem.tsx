import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

import { LANDING_PROBLEM_CARDS } from '../../config';

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
      <div className="tablet:flex-row tablet:gap-4 flex w-full flex-col gap-18">
        {LANDING_PROBLEM_CARDS.map(
          ({ image, imageAlt, title, description }) => (
            <VStack key={image} className="w-full" gap="md">
              <div className="relative aspect-[320/197.82] w-full overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1200px) 363px, (min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <VStack className="w-full" gap="xs">
                <Text
                  className="desktop:block hidden"
                  typography="title-22-bold"
                  textColor="gray-800"
                >
                  {title}
                </Text>
                <Text
                  typography="subtitle-16-bold"
                  textColor="gray-800"
                  className="desktop:hidden whitespace-pre"
                >
                  {title}
                </Text>
                <Text
                  typography="body-15-medium"
                  textColor="gray-500"
                  className="desktop:text-lg!"
                >
                  {description}
                </Text>
              </VStack>
            </VStack>
          ),
        )}
      </div>
    </VStack>
  );
};
