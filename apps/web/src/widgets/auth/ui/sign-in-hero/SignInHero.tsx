import Image from 'next/image';

import { Text, VStack } from '@causw/cds';

export const SignInHero = () => {
  return (
    <VStack justify="center" align="center" className="w-full gap-4">
      <Image
        src="/images/brand/ccssaa-profile.svg"
        alt="크자회"
        width={56}
        height={56}
        preload
      />
      <Text
        as="h1"
        typography="title-24-bold"
        textColor="gray-800"
        className="tablet:block hidden text-center whitespace-pre-wrap"
      >
        {'크자회 로그인하고\n중요한 소식을 놓치지 마세요.'}
      </Text>
      <Text
        as="h1"
        typography="subtitle-20-bold"
        textColor="gray-800"
        className="tablet:hidden text-center whitespace-pre-wrap"
      >
        {'크자회 로그인하고\n중요한 소식을 놓치지 마세요.'}
      </Text>
    </VStack>
  );
};
