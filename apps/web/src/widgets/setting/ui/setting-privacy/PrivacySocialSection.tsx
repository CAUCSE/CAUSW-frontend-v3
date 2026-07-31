'use client';

import { Text, Toggle, VStack } from '@causw/cds';

import {
  useSocialAccountStatusSuspenseQuery,
  useUnlinkSocialAccountMutation,
  type NativeSocialLoginProvider,
  useSocialAccountOAuthMutation,
} from '@/entities/auth';

export const PrivacySocialSection = () => {
  const { data: socialAccountStatus } = useSocialAccountStatusSuspenseQuery();

  const unlinkMutation = useUnlinkSocialAccountMutation();
  const oAuthMutation = useSocialAccountOAuthMutation();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const SOCIAL_OAUTH_PROVIDER_KEY = 'social-oauth-provider';

  const handleToggle = (
    provider: NativeSocialLoginProvider,
    checked: boolean,
  ) => {
    if (checked) {
      oAuthMutation.mutate(provider, {
        onSuccess: ({ linkToken }) => {
          sessionStorage.setItem(SOCIAL_OAUTH_PROVIDER_KEY, provider);

          window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}?linkToken=${linkToken}`;
        },
      });
      return;
    }

    unlinkMutation.mutate(provider);
  };

  const isPending = oAuthMutation.isPending || unlinkMutation.isPending;

  return (
    <VStack className="gap-5 rounded-2xl bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        SNS 계정 연동
      </Text>
      <VStack className="gap-6">
        <Toggle
          checked={socialAccountStatus.kakao}
          disabled={isPending}
          className="justify-between"
          onCheckedChange={(checked) => handleToggle('kakao', checked)}
        >
          <Toggle.Label typography="body-16-medium">카카오 연동</Toggle.Label>
          <Toggle.Switch />
        </Toggle>
        <Toggle
          checked={socialAccountStatus.apple}
          onCheckedChange={(checked) => handleToggle('apple', checked)}
          disabled={isPending}
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">Apple 연동</Toggle.Label>
          <Toggle.Switch />
        </Toggle>
        <Toggle
          checked={socialAccountStatus.google}
          onCheckedChange={(checked) => handleToggle('google', checked)}
          disabled={isPending}
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">Google 연동</Toggle.Label>
          <Toggle.Switch />
        </Toggle>
      </VStack>
    </VStack>
  );
};
