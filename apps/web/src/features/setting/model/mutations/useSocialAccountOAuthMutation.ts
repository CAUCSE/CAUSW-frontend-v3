import { useMutation } from '@tanstack/react-query';

import { initSocialAccountOAuth } from '../../api/post/linkAccount';

export const useSocialAccountOAuthMutation = () => {
  return useMutation({
    mutationFn: initSocialAccountOAuth,
  });
};
