'use client';

import { useSyncExternalStore } from 'react';

import { toastStore } from './store';

const EMPTY: [] = [];

export const useToastStore = () =>
  useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    () => EMPTY,
  );
