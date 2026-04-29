'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { boardQueryOptions } from '../../config';

export const useGetAvailableBoards = () => {
  return useSuspenseQuery(boardQueryOptions.available());
};
