import type { ComponentProps } from 'react';

import { Flex, GoogleLogo } from '@causw/cds';

type GoogleLoginButtonProps = ComponentProps<'button'> & {
  clientId?: string;
  redirectUri?: string;
  state?: string;
  scope?: string;
};

export const GoogleLoginButton = ({
  className,
  onClick,
  clientId,
  redirectUri,
  state,
  scope = 'openid email profile',
  ...props
}: GoogleLoginButtonProps) => {
  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    if (!clientId || !redirectUri) return;

    const resolvedRedirectUri = redirectUri.startsWith('/')
      ? `${window.location.origin}${redirectUri}`
      : redirectUri;

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', resolvedRedirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', scope);
    url.searchParams.set('prompt', 'consent');
    url.searchParams.set('access_type', 'offline');
    if (state) url.searchParams.set('state', state);

    window.location.href = url.toString();
  };

  return (
    <button
      type="button"
      {...props}
      onClick={handleLogin}
      className={`typo-body-15-semibold h-[54px] w-full cursor-pointer rounded-md border border-gray-200 bg-white px-6 text-gray-800 transition-all duration-200 hover:enabled:opacity-80 active:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <Flex gap="sm" align="center" justify="center" className="w-full">
        <GoogleLogo size={16} />
        <span>Google로 시작하기</span>
      </Flex>
    </button>
  );
};
