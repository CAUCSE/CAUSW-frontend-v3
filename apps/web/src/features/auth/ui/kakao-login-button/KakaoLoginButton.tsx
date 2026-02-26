import type { ComponentProps } from 'react';

import { Flex } from '@causw/cds';

type KakaoLoginButtonProps = ComponentProps<'button'>;

const KakaoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0C3.58172 0 0 2.91172 0 6.5C0 8.78906 1.42578 10.8125 3.56641 12.0664L2.71484 15.2383C2.64844 15.4766 2.91797 15.668 3.12891 15.5273L7.01953 12.8555C7.33984 12.8828 7.66797 12.9 8 12.9C12.4183 12.9 16 9.98828 16 6.4C16 2.81172 12.4183 0 8 0Z"
      fill="currentColor"
    />
  </svg>
);

export const KakaoLoginButton = ({
  className,
  ...props
}: KakaoLoginButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={`typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md bg-[#FEE500] px-6 text-[#000000] transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <KakaoIcon />
        <span>Kakao로 시작하기</span>
      </Flex>
    </button>
  );
};
