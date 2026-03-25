import { useSuspenseQuery } from '@tanstack/react-query';

import { authQueryOptions } from '../../config';

export const useMyInfoSuspenseQuery = () => {
  return useSuspenseQuery(authQueryOptions.me());
};
