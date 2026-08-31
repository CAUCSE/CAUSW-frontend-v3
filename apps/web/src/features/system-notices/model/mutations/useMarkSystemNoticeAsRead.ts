'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { systemNoticeQueryKeys } from '@/entities/system-notices';

import { updateSystemNoticesIsRead } from '../../api';

/**
 * 시스템 공지를 읽음 처리합니다.
 *
 * 성공 시 시스템 공지 쿼리를 무효화하여 홈 팝업 카드가 즉시 사라지도록 합니다.
 */
export const useMarkSystemNoticeAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (systemNoticeId: string) =>
      updateSystemNoticesIsRead(systemNoticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: systemNoticeQueryKeys.all });
    },
  });
};
