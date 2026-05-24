'use client';

const PASSWORD_RESET_CONTEXT_KEY = 'password-reset-context';

export interface PasswordResetContext {
  email: string;
  temporaryPassword: string;
}

const isPasswordResetContext = (
  value: unknown,
): value is PasswordResetContext => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const context = value as Record<string, unknown>;

  return (
    typeof context.email === 'string' &&
    context.email.length > 0 &&
    typeof context.temporaryPassword === 'string' &&
    context.temporaryPassword.length > 0
  );
};

export const setPasswordResetContext = (context: PasswordResetContext) => {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(
    PASSWORD_RESET_CONTEXT_KEY,
    JSON.stringify(context),
  );
};

export const getPasswordResetContext = (): PasswordResetContext | null => {
  if (typeof window === 'undefined') return null;

  const raw = window.sessionStorage.getItem(PASSWORD_RESET_CONTEXT_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    return isPasswordResetContext(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const clearPasswordResetContext = () => {
  if (typeof window === 'undefined') return;

  window.sessionStorage.removeItem(PASSWORD_RESET_CONTEXT_KEY);
};
