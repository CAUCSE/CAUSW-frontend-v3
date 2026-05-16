'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { boardQueryOptions } from '../../config';

export const useGetWritableBoards = () => {
  return useSuspenseQuery(boardQueryOptions.writable());
};
