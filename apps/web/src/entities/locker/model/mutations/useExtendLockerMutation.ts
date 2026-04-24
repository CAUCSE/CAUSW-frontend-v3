'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLockerExtension } from '../../api';
import { lockerQueryKey } from '../../config';

export const useExtendLockerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLockerExtension,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: lockerQueryKey.all });
    },
  });
};
