import Image from 'next/image';

import { Flex } from '@causw/cds';

export function SideBarHeader() {
  return (
    <Flex align="center" justify="start" className="px-4">
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
}
