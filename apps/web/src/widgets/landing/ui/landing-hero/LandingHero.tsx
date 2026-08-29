import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

import { LandingStoreCTA } from '../landing-store-cta/LadingStoreCTA';

export const LandingHero = () => {
  return (
    <VStack as="section" className="mt-30 w-full items-center" gap="lg">
      <div className="desktop:h-90 relative flex h-[197.82px] w-full items-start justify-center overflow-hidden rounded-2xl bg-linear-to-b from-[#F5F6F8] to-[#E2EFFF]">
        <Image
          src="/images/landing/hero/hero-app-preview.png"
          alt="크자회 앱 미리보기"
          width={482}
          height={292}
          priority
          sizes="(min-width: 1200px) 482px, 265px"
          className="desktop:w-120.5 mt-0 h-auto w-66.25 shrink-0"
        />
      </div>
      <VStack className="w-full items-center text-center" gap="md">
        <Text
          as="h1"
          typography="title-24-bold"
          textColor="gray-800"
          className="desktop:hidden whitespace-pre"
        >
          {'학부생과 동문을 잇는 \n 소프트웨어대학 동문회 앱, 크자회'}
        </Text>
        <Text
          as="h1"
          typography="title-48-bold"
          textColor="gray-800"
          className="desktop:block hidden whitespace-pre"
        >
          {'학부생과 동문을 잇는 \n 소프트웨어대학 동문회 앱, 크자회'}
        </Text>
        <Text
          typography="body-15-medium"
          textColor="gray-500"
          className="desktop:hidden whitespace-pre"
        >
          {
            '선후배와 연결되고, 학부의 중요한 소식을 챙겨주는 \n 소프트웨어대학 동문회 공간이에요.'
          }
        </Text>
        <Text
          typography="body-16-medium"
          textColor="gray-500"
          className="desktop:block desktop:text-3xl! hidden whitespace-pre"
        >
          {
            '선후배와 연결되고, 학부의 중요한 소식을 챙겨주는 \n 소프트웨어대학 동문회 공간이에요.'
          }
        </Text>
      </VStack>
      <LandingStoreCTA />
    </VStack>
  );
};
