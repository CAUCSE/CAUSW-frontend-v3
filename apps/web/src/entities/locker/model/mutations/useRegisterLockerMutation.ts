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
      await Promise.all([
        queryClient.refetchQueries({ queryKey: lockerQueryKey.me() }),
        queryClient.refetchQueries({ queryKey: lockerQueryKey.locations() }),
        queryClient.refetchQueries({
          queryKey: [...lockerQueryKey.all, 'location'],
          type: 'active',
        }),
      ]);
    },
  });
};
