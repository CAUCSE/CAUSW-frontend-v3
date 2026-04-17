import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type EmailVerificationAutoSendState = {
  autoSentEmails: Record<string, true>;
  hasAutoSent: (email: string) => boolean;
  markAutoSent: (email: string) => void;
  reset: () => void;
};

const initialState = {
  autoSentEmails: {},
};

export const useEmailVerificationAutoSendStore =
  create<EmailVerificationAutoSendState>()(
    persist(
      (set, get) => ({
        ...initialState,
        hasAutoSent: (email) => Boolean(get().autoSentEmails[email]),
        markAutoSent: (email) =>
          set((state) => ({
            autoSentEmails: {
              ...state.autoSentEmails,
              [email]: true,
            },
          })),
        reset: () => set(initialState),
      }),
      {
        name: 'email-verification-auto-send',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          autoSentEmails: state.autoSentEmails,
        }),
      },
    ),
  );
