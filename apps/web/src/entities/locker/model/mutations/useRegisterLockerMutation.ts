'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLockerRegistration } from '../../api';
import { lockerQueryKey } from '../../config';

export const useRegisterLockerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLockerRegistration,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
    },
  });
};
