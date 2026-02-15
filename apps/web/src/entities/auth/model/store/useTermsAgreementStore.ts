import { create } from 'zustand';

type TermsAgreementState = {
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  thirdPartySharingAgreed: boolean;
  setServiceTermsAgreed: (checked: boolean) => void;
  setPrivacyPolicyAgreed: (checked: boolean) => void;
  setThirdPartySharingAgreed: (checked: boolean) => void;
  setAllRequiredTermsAgreed: (checked: boolean) => void;
  reset: () => void;
};

const initialState = {
  serviceTermsAgreed: false,
  privacyPolicyAgreed: false,
  thirdPartySharingAgreed: false,
};

export const useTermsAgreementStore = create<TermsAgreementState>((set) => ({
  ...initialState,
  setServiceTermsAgreed: (checked) => set({ serviceTermsAgreed: checked }),
  setPrivacyPolicyAgreed: (checked) => set({ privacyPolicyAgreed: checked }),
  setThirdPartySharingAgreed: (checked) =>
    set({ thirdPartySharingAgreed: checked }),
  setAllRequiredTermsAgreed: (checked) =>
    set({
      serviceTermsAgreed: checked,
      privacyPolicyAgreed: checked,
      thirdPartySharingAgreed: checked,
    }),
  reset: () => set(initialState),
}));
