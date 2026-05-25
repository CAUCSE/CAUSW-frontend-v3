'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { boardQueryOptions } from '../../config';

interface UseGetAvailableBoardsProps {
  isTab?: boolean;
}

export const useGetAvailableBoards = ({
  isTab,
}: UseGetAvailableBoardsProps = {}) => {
  return useSuspenseQuery(boardQueryOptions.available({ isTab }));
};
