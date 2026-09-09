import { safeCallbackUrl } from '@/shared/lib';

const PENDING_DESTINATION_KEY = 'causw:pending-destination';
const PENDING_DESTINATION_TTL = 7 * 24 * 60 * 60 * 1000;

export const savePendingDestination = (path: string) => {
  const safePath = safeCallbackUrl(path);
  if (safePath === '/home') return;

  localStorage.setItem(
    PENDING_DESTINATION_KEY,
    JSON.stringify({ path: safePath, savedAt: Date.now() }),
  );
};

export const consumePendingDestination = (): string | null => {
  const raw = localStorage.getItem(PENDING_DESTINATION_KEY);
  localStorage.removeItem(PENDING_DESTINATION_KEY);
  if (!raw) return null;

  try {
    const { path, savedAt } = JSON.parse(raw) as {
      path: string;
      savedAt: number;
    };
    if (Date.now() - savedAt > PENDING_DESTINATION_TTL) return null;
    return safeCallbackUrl(path);
  } catch {
    return null;
  }
};

export const clearPendingDestination = () =>
  localStorage.removeItem(PENDING_DESTINATION_KEY);
