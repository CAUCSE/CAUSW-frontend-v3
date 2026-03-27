'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getCeremonyDetail } from '../../api';
import { ceremonyQueryKey } from '../../config';
import type { CeremonyDetailContext } from '../types';

export const useCeremonyDetailQuery = (
  ceremonyId: string,
  context: CeremonyDetailContext = 'general',
) =>
  useSuspenseQuery({
    queryKey: ceremonyQueryKey.detail(ceremonyId, context),
    queryFn: () => getCeremonyDetail(ceremonyId, context),
    staleTime: QUERY_STALE_TIME.DEFAULT,
  });
