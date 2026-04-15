import { useSuspenseQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

export const useTermsQuery = () => {
  return useSuspenseQuery(authQueryOptions.terms());
};
