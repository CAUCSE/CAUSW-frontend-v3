const PENDING_NOTIFICATION_READ_KEY = 'causw:pending-notification-read';
const PENDING_NOTIFICATION_READ_TTL = 7 * 24 * 60 * 60 * 1000;
const PENDING_NOTIFICATION_READ_MAX = 50;
const PENDING_NOTIFICATION_READ_MAX_ATTEMPTS = 5;

export interface PendingNotificationRead {
  id: string;
  savedAt: number;
  /** 지금까지 실패한 횟수 */
  attempts: number;
}

/** 저장된 항목 중 만료되지 않은 것만 반환한다. */
const readValidItems = (): PendingNotificationRead[] => {
  const raw = localStorage.getItem(PENDING_NOTIFICATION_READ_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as PendingNotificationRead[];
    if (!Array.isArray(parsed)) return [];

    const now = Date.now();
    return parsed
      .filter(
        (item) =>
          typeof item?.id === 'string' &&
          typeof item?.savedAt === 'number' &&
          now - item.savedAt <= PENDING_NOTIFICATION_READ_TTL,
      )
      .map((item) => ({
        ...item,
        attempts: typeof item.attempts === 'number' ? item.attempts : 0,
      }));
  } catch {
    return [];
  }
};

/** 항목 전체를 덮어쓴다. 개수 제한을 적용하고, 비면 키를 지운다. */
const writeItems = (items: PendingNotificationRead[]) => {
  if (items.length === 0) {
    localStorage.removeItem(PENDING_NOTIFICATION_READ_KEY);
    return;
  }

  localStorage.setItem(
    PENDING_NOTIFICATION_READ_KEY,
    JSON.stringify(items.slice(-PENDING_NOTIFICATION_READ_MAX)),
  );
};

/** 콜드 스타트로 푸시를 탭한 경우를 대비해 읽음 처리할 알림을 큐에 저장한다. */
export const savePendingNotificationRead = (id: string) => {
  if (!id) return;

  const items = readValidItems();
  if (items.some((item) => item.id === id)) return;

  writeItems([...items, { id, savedAt: Date.now(), attempts: 0 }]);
};

/** 큐에 대기 중인 읽음 처리 대상 알림이 있는지 확인한다. */
export const hasPendingNotificationReads = (): boolean =>
  readValidItems().length > 0;

/** 큐에서 읽음 처리를 시도할 대상 알림을 조회한다. */
export const getPendingNotificationReads = (): PendingNotificationRead[] =>
  readValidItems();

/** 읽음 처리에 성공한 대상 하나를 큐에서 제거한다. */
export const removePendingNotificationRead = (id: string) => {
  const items = readValidItems();
  writeItems(items.filter((item) => item.id !== id));
};

/**
 * 읽음 처리에 실패한 대상 알림의 시도 횟수를 1 늘린다.
 * 최대 시도 횟수를 넘기면 영구 실패로 보고 큐에서 제거한다.
 */
export const recordPendingNotificationReadFailure = (id: string) => {
  const items = readValidItems();

  const nextItems = items
    .map((item) =>
      item.id === id ? { ...item, attempts: item.attempts + 1 } : item,
    )
    .filter((item) => item.attempts < PENDING_NOTIFICATION_READ_MAX_ATTEMPTS);

  writeItems(nextItems);
};
