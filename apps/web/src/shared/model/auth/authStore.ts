import { create } from 'zustand';

type AuthErrorType = 'token-expired' | 'no-permission';

type AuthError = {
  code: AuthErrorType;
  message: string;
};

type AuthStore = {
  authError: AuthError | null;
  setAuthError: (error: AuthError) => void;
  clearAuthError: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authError: null,
  setAuthError: (error) => set({ authError: error }),
  clearAuthError: () => set({ authError: null }),
}));
