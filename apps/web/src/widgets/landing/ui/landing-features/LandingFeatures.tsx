import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

import { LANDING_FEATURE_CARDS } from '../../config';

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
        {LANDING_FEATURE_CARDS.map(
          ({ image, imageAlt, title, description }) => (
            <div
              key={image}
              className="tablet:flex-row tablet:items-center tablet:gap-8 flex w-full flex-col gap-4"
            >
              <div
                className={`tablet:flex-1 relative aspect-104/89 w-full shrink-0 overflow-hidden rounded-2xl`}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1200px) 544px, (min-width: 768px) 328px, 100vw"
                  className="object-cover"
                />
              </div>
              <VStack className="tablet:flex-1 w-full" gap="xs">
                <Text
                  typography="title-22-bold"
                  textColor="gray-800"
                  className="desktop:block hidden"
                >
                  {title}
                </Text>
                <Text
                  typography="subtitle-16-bold"
                  textColor="gray-800"
                  className="desktop:hidden"
                >
                  {title}
                </Text>
                <Text
                  typography="body-15-medium"
                  textColor="gray-500"
                  className="desktop:text-lg! whitespace-pre"
                >
                  {description}
                </Text>
              </VStack>
            </div>
          ),
        )}
      </VStack>
    </VStack>
  );
};
