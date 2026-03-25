import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getAdmissionState, getMyInfo } from '../../api';
import { authQueryKey } from '../query-key';

export const authQueryOptions = {
  me: () =>
    queryOptions({
      queryKey: authQueryKey.me(),
      queryFn: getMyInfo,
      staleTime: QUERY_STALE_TIME.SHORT,
    }),
  admissionState: () =>
    queryOptions({
      queryKey: authQueryKey.admissionState(),
      queryFn: getAdmissionState,
      staleTime: QUERY_STALE_TIME.SHORT,
    }),
};
