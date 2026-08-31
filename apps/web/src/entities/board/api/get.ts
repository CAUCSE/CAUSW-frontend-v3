import { API } from '@/shared/api';
import { createQueryString, withQuery } from '@/shared/utils';

import { BOARDS_API_PREFIX } from '../config';
import {
  type GetWritableBoardListResponseDto,
  type GetAvailableBoardListResponseDto,
  type GetAvailableBoardListQuery,
  type GetWritableBoardListQuery,
} from '../model';

export const getAvailableBoards = async (
  query: GetAvailableBoardListQuery = {},
) => {
  const url = withQuery(
    `${BOARDS_API_PREFIX}/available`,
    createQueryString(query),
  );

  const response = await API.get<GetAvailableBoardListResponseDto>(url);
  return response;
};

export const getWritableBoards = async (
  query: GetWritableBoardListQuery = {},
) => {
  const url = withQuery(
    `${BOARDS_API_PREFIX}/writable`,
    createQueryString(query),
  );

  const response = await API.get<GetWritableBoardListResponseDto>(url);
  return response;
};
