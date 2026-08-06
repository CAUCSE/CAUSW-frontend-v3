import { useSuspenseQuery } from '@tanstack/react-query';

import { authQueryOptions } from '../../config';

export const useSocialAccountStatusSuspenseQuery = () => {
  return useSuspenseQuery(authQueryOptions.socialAccountStatus());
};
