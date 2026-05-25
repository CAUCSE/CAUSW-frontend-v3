import { type GetAvailableBoardListQuery } from '../../model';

export const boardQueryKeys = {
  all: ['boards'] as const,
  available: (query: GetAvailableBoardListQuery) =>
    [...boardQueryKeys.all, 'available', query] as const,
  writable: () => [...boardQueryKeys.all, 'writable'] as const,
};
