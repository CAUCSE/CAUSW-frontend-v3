import type { ComponentProps } from 'react';

import { AppleLogo, Flex } from '@causw/cds';

type AppleLoginButtonProps = ComponentProps<'button'> & {
  serviceId?: string;
  redirectUri?: string;
  state?: string;
};

export const AppleLoginButton = ({
  className,
  onClick,
  serviceId,
  redirectUri,
  state,
  ...props
}: AppleLoginButtonProps) => {
  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (!serviceId || !redirectUri) return;

    const resolvedRedirectUri = redirectUri.startsWith('/')
      ? `${window.location.origin}${redirectUri}`
      : redirectUri;

    const url = new URL('https://appleid.apple.com/auth/authorize');
    url.searchParams.set('client_id', serviceId);
    url.searchParams.set('redirect_uri', resolvedRedirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('response_mode', 'query');
    url.searchParams.set('scope', 'name email');
    if (state) url.searchParams.set('state', state);

    window.location.href = url.toString();
  };

  return (
    <button
      type="button"
      {...props}
      onClick={handleLogin}
      className={`typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md bg-[#000000] px-6 text-white transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <AppleLogo size={16} />
        <span>Apple로 시작하기</span>
      </Flex>
    </button>
  );
};
