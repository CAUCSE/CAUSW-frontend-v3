import Image from 'next/image';

import { DesktopOnly, MobileOnly } from '@/shared/ui';

export const SignInImageSection = () => {
  return (
    <>
      <MobileOnly>
        <Image
          src="/images/ccssaa-sign-in-people.png"
          alt="동문 네트워크 로그인 배너"
          width={320}
          height={176}
          priority
        />
      </MobileOnly>
      <DesktopOnly>
        <Image
          src="/images/ccssaa-sign-in-people.png"
          alt="동문 네트워크 로그인 배너"
          width={480}
          height={264}
          priority
        />
      </DesktopOnly>
    </>
  );
};
