import { create } from 'zustand';

import type { TermResponseDto } from '../types';

type TermsDetailDialogState = {
  selectedTerm: TermResponseDto | null;
  open: (term: TermResponseDto) => void;
  close: () => void;
};

export const useTermsDetailDialogStore = create<TermsDetailDialogState>(
  (set) => ({
    selectedTerm: null,
    open: (term) => set({ selectedTerm: term }),
    close: () => set({ selectedTerm: null }),
  }),
);
