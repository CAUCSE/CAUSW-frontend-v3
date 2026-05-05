import { STORAGE_SESSION_PERSIST_KEY } from '@/shared/config';
import { TOGGLE_VALUE } from '@/shared/constants';

const getCookieStore = async () => {
  const { cookies } = await import('next/headers');
  return await cookies();
};

export const getServerSessionPersist = async (): Promise<boolean> => {
  const cookieStore = await getCookieStore();
  return (
    cookieStore.get(STORAGE_SESSION_PERSIST_KEY)?.value === TOGGLE_VALUE.ON
  );
};
