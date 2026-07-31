import { useMutation } from '@tanstack/react-query';

import { initSocialAccountOAuth } from '../../api';

export const useSocialAccountOAuthMutation = () => {
  return useMutation({
    mutationFn: initSocialAccountOAuth,
  });
};
