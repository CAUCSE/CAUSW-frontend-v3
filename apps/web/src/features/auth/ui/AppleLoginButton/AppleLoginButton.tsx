import type { ComponentProps } from 'react';

import { Flex } from '@causw/cds';

type AppleLoginButtonProps = ComponentProps<'button'>;

const AppleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4141 8.64062C13.4297 10.6562 15.1016 11.3516 15.1172 11.3594C15.1016 11.3984 14.8516 12.3125 14.1797 13.2578C13.5938 14.0859 12.9766 14.9141 11.9531 14.9297C10.9453 14.9453 10.6094 14.2969 9.46875 14.2969C8.32812 14.2969 7.95312 14.9141 7.00781 14.9453C6.00781 14.9766 5.29688 14.0391 4.70312 13.2188C3.5 11.5391 2.57812 8.49219 3.82031 6.39062C4.4375 5.34375 5.53125 4.67188 6.71094 4.65625C7.67969 4.64062 8.58594 5.34375 9.17188 5.34375C9.75781 5.34375 10.8828 4.48438 12.0625 4.60938C12.5547 4.625 14.0234 4.82031 14.9375 6.32031C14.8672 6.35938 13.3984 7.28125 13.4141 8.64062ZM11.0547 3.14062C11.5391 2.57812 11.8672 1.78125 11.7734 0.984375C11.0859 1.01562 10.2344 1.46094 9.73438 2.02344C9.28906 2.51562 8.89062 3.3125 9 4.10156C9.75781 4.15625 10.5625 3.70312 11.0547 3.14062Z"
      fill="currentColor"
    />
  </svg>
);

export const AppleLoginButton = ({
  className,
  ...props
}: AppleLoginButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={`typo-body-15-semibold h-[54px] w-full rounded-md bg-[#000000] px-6 text-white transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <AppleIcon />
        <span>Apple로 시작하기</span>
      </Flex>
    </button>
  );
};
