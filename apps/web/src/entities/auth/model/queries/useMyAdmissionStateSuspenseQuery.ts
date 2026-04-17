import { useSuspenseQuery } from '@tanstack/react-query';

import { authQueryOptions } from '../../config';

export const useMyAdmissionStateSuspenseQuery = () => {
  return useSuspenseQuery(authQueryOptions.admissionState());
};
