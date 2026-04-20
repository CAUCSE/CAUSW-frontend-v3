import { useSuspenseQuery } from '@tanstack/react-query';

import { userQueryOptions } from '../../config';

export const useMyAccountSuspenseQuery = () => {
  return useSuspenseQuery(userQueryOptions.account());
};
