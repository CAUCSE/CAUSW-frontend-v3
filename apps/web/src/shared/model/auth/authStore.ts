import { create } from 'zustand';

type AuthErrorType = 'token-expired' | 'no-permission';

export class AuthError extends Error {
  errorType: AuthErrorType;
  message: string;

  constructor(
    errorType: AuthErrorType,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.errorType = errorType;
    this.message = message;
  }
}

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
