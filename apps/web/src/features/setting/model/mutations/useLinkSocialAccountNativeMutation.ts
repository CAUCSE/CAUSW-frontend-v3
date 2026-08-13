import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRequestNativeSocialTokenMutation } from '@/features/auth';

import { authQueryKey, type NativeSocialLoginProvider } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

import { linkSocialAccountNative } from '../../api/post/linkAccount';

export const useLinkSocialAccountNativeMutation = () => {
  const queryClient = useQueryClient();
  const requestNativeSocialTokenMutation =
    useRequestNativeSocialTokenMutation();

  return useMutation({
    mutationFn: async (provider: NativeSocialLoginProvider) => {
      const tokens = await requestNativeSocialTokenMutation.mutateAsync({
        provider,
      });

      return linkSocialAccountNative({
        provider,
        accessToken: tokens.accessToken ?? null,
        idToken: tokens.idToken ?? null,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKey.socialAccountStatus(),
      });

      toast.success('소셜 계정이 연동되었습니다.');
    },

    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '소셜 계정 연동에 실패했습니다. 다시 시도해주세요.',
        ),
      );
    },
  });
};
