import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

interface LandingProblemCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export const LandingProblemCard = ({
  image,
  imageAlt,
  title,
  description,
}: LandingProblemCardProps) => {
  return (
    <VStack className="w-full" gap="md">
      <div className="relative aspect-55/34 w-full overflow-hidden rounded-2xl">
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
          className="desktop:block hidden whitespace-pre"
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
  );
};
