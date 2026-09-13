'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { type BoardGroup, boardQueryOptions } from '../../config';

interface UseGetAvailableBoardsProps {
  boardGroup?: BoardGroup;
}

export const useGetAvailableBoards = ({
  boardGroup,
}: UseGetAvailableBoardsProps = {}) => {
  return useSuspenseQuery(boardQueryOptions.available({ boardGroup }));
};
