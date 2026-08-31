'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { systemNoticeQueryOptions } from '../../config';

export const useSystemNoticeLatest = () => {
  return useSuspenseQuery(systemNoticeQueryOptions.latest());
};
