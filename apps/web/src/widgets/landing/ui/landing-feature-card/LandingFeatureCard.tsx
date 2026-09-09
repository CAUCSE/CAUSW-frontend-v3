import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

interface LandingFeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export const LandingFeatureCard = ({
  image,
  imageAlt,
  title,
  description,
}: LandingFeatureCardProps) => {
  return (
    <div className="tablet:flex-row tablet:items-center tablet:gap-8 flex w-full flex-col gap-4">
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
  );
};
