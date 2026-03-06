'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CeremonyCreateRequest } from '@/entities/ceremony';
import { ceremonyQueryKey } from '@/entities/ceremony';

import { toast } from '@/shared/model/toast';
import { extractErrorMessage } from '@/shared/utils';

import { createCeremony } from '../../api';

interface CreateCeremonyVariables {
  dto: CeremonyCreateRequest;
  imageFiles: File[];
}

export const useCreateCeremonyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dto, imageFiles }: CreateCeremonyVariables) =>
      createCeremony(dto, imageFiles),
    onSuccess: () => {
      toast.success('경조사 신청이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ceremonyQueryKey.lists() });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, '경조사 신청에 실패했습니다.'));
    },
  });
};
