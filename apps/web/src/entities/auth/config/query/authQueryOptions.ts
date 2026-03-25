import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAdmissionState } from '../../api';
import { authQueryKey } from '../query-key';

export const authQueryOptions = {
  admissionState: () =>
    queryOptions({
      queryKey: authQueryKey.admissionState(),
      queryFn: getAdmissionState,
      staleTime: QUERY_STALE_TIME.SHORT,
    }),
};
