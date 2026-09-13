import {
  type GetWritableBoardListQuery,
  type GetAvailableBoardListQuery,
} from '../../model';

export const boardQueryKeys = {
  all: ['boards'] as const,
  available: (query: GetAvailableBoardListQuery) =>
    [...boardQueryKeys.all, 'available', query] as const,
  writable: (query: GetWritableBoardListQuery) =>
    [...boardQueryKeys.all, 'writable', query] as const,
};
