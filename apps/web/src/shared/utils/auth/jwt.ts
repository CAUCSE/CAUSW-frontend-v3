const TOKEN_REFRESH_THRESHOLD_SECONDS = 60;

export const getJwtExp = (token: string): number | null => {
  const [, payload] = token.split('.');

  if (!payload) {
    return null;
  }

  try {
    const normalizedPayload = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const parsedPayload = JSON.parse(atob(normalizedPayload)) as {
      exp?: unknown;
    };

    return typeof parsedPayload.exp === 'number' ? parsedPayload.exp : null;
  } catch {
    return null;
  }
};

export const shouldRefreshAccessToken = (accessToken: string): boolean => {
  const expiresAt = getJwtExp(accessToken);

  if (!expiresAt) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return expiresAt - now <= TOKEN_REFRESH_THRESHOLD_SECONDS;
};
