import { create } from 'zustand';

type TermsAgreementState = {
  agreements: Record<string, boolean>;
  setAgreement: (type: string, checked: boolean) => void;
  setAllTermsAgreed: (types: string[], checked: boolean) => void;
  reset: () => void;
};

const initialState = {
  agreements: {},
};

export const useTermsAgreementStore = create<TermsAgreementState>((set) => ({
  ...initialState,
  setAgreement: (type, checked) =>
    set((state) => ({
      agreements: {
        ...state.agreements,
        [type]: checked,
      },
    })),
  setAllTermsAgreed: (types, checked) =>
    set((state) => ({
      agreements: types.reduce<Record<string, boolean>>(
        (acc, type) => ({
          ...acc,
          [type]: checked,
        }),
        { ...state.agreements },
      ),
    })),
  reset: () => set(initialState),
}));
