import type { ComponentProps } from 'react';

import { Flex } from '@causw/cds';

type GoogleLoginButtonProps = ComponentProps<'button'> & {
  clientId?: string;
  redirectUri?: string;
  state?: string;
  scope?: string;
};

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.6 0 6.1 1.6 7.5 2.9l5.1-5.1C33.3 4.1 29 2.4 24 2.4 15.2 2.4 7.7 7.4 4.1 14.7l6.2 4.8C12 13.6 17.6 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.1 24.6c0-1.6-.1-2.7-.4-3.9H24v7.5h12.7c-.3 2-1.7 5-4.9 7.1l6 4.6c3.5-3.2 4.3-7.9 4.3-13.3z"
    />
    <path
      fill="#34A853"
      d="M10.3 28.1c-0.5-1.4-0.8-2.8-0.8-4.6s.3-3.2.8-4.6l-6.2-4.8C2.6 17 1.8 20 1.8 23.5c0 3.5.8 6.5 2.3 9.4l6.2-4.8z"
    />
    <path
      fill="#FBBC05"
      d="M24 44.6c6.5 0 12-2.1 16-5.7l-6-4.6c-1.6 1.1-3.9 2-7.9 2-6.4 0-11.9-4.1-13.7-9.8l-6.3 4.9C9.6 39.5 16.9 44.6 24 44.6z"
    />
  </svg>
);

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
        <GoogleIcon />
        <span>Google로 시작하기</span>
      </Flex>
    </button>
  );
};
