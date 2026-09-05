'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { type BoardGroup, boardQueryOptions } from '../../config';

interface UseGetWritableBoardsProps {
  boardGroup?: BoardGroup;
}

export const useGetWritableBoards = ({
  boardGroup,
}: UseGetWritableBoardsProps = {}) => {
  return useSuspenseQuery(boardQueryOptions.writable({ boardGroup }));
};
