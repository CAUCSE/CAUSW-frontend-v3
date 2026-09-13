const PENDING_NOTIFICATION_READ_KEY = 'causw:pending-notification-read';
const PENDING_NOTIFICATION_READ_TTL = 7 * 24 * 60 * 60 * 1000;
const PENDING_NOTIFICATION_READ_MAX = 50;

export interface PendingNotificationRead {
  id: string;
  savedAt: number;
}

/** 저장된 항목 중 만료되지 않은 것만 반환한다. */
const readValidItems = (): PendingNotificationRead[] => {
  const raw = localStorage.getItem(PENDING_NOTIFICATION_READ_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as PendingNotificationRead[];
    if (!Array.isArray(parsed)) return [];

    const now = Date.now();
    return parsed.filter(
      (item) =>
        typeof item?.id === 'string' &&
        typeof item?.savedAt === 'number' &&
        now - item.savedAt <= PENDING_NOTIFICATION_READ_TTL,
    );
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

/** 콜드 스타트로 푸시를 탭한 경우를 대비해 읽음 처리할 알림을 저장한다. */
export const savePendingNotificationRead = (id: string) => {
  if (!id) return;

  const items = readValidItems();
  if (items.some((item) => item.id === id)) return;

  writeItems([...items, { id, savedAt: Date.now() }]);
};

/** 대기 중인 읽음 처리 대상이 있는지만 확인한다. */
export const hasPendingNotificationReads = (): boolean =>
  readValidItems().length > 0;

/** 읽음 처리를 시도할 대상을 모두 꺼내고 저장소를 비운다. */
export const consumePendingNotificationReads =
  (): PendingNotificationRead[] => {
    const items = readValidItems();
    writeItems([]);
    return items;
  };

/** 읽음 처리에 실패한 대상을 다음 시도를 위해 되돌린다. */
export const restorePendingNotificationReads = (
  items: PendingNotificationRead[],
) => {
  if (items.length === 0) return;

  const stored = readValidItems();
  const storedIds = new Set(stored.map((item) => item.id));
  const restored = items.filter((item) => !storedIds.has(item.id));

  writeItems([...restored, ...stored]);
};
