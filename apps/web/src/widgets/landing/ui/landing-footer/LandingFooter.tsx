import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

export const LandingFooter = () => {
  return (
    <footer className="flex h-26 w-full items-end justify-between pb-10">
      <VStack className="flex-1 gap-3">
        <Image
          src="/images/ccssaa-logo.png"
          alt="CCSSAA Logo"
          width={90}
          height={14}
        />
        <Text
          typography="caption-12-regular"
          textColor="gray-400"
          className="whitespace-pre"
        >
          {'운영 | 중앙대학교 ICT 위원회\n문의 | caucsedongne@gmail.com'}
        </Text>
      </VStack>
      <a
        href="https://www.instagram.com/causwcse_dongne?igsi=MTQwemRzeWl6MncxcA=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="크자회 인스타그램"
      >
        <Image
          src="/images/landing/brand/instagram.svg"
          alt="CCSSAA Instagram Link"
          width={24}
          height={24}
        />
      </a>
    </footer>
  );
};
