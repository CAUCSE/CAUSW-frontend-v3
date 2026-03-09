import Image from 'next/image';

import { Flex } from '@causw/cds';

export const LogoHeader = () => {
  return (
    <Flex
      align="center"
      justify="center"
      className="h-14 w-full border-b border-gray-200 bg-gray-100"
    >
      <Image
        src="/images/ccssaa-logo.png"
        alt="CCSSAA 로고"
        width={112}
        height={17}
        priority
        unoptimized
        className="h-[17px] w-[112px]"
      />
    </Flex>
  );
};
