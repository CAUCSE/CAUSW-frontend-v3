'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { useEventCallback } from './useEventCallback';
import { useEventListener } from './useEventListener';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

/**
 * @description localStorage 값을 React state처럼 읽고 쓰며, 변경 사항을 다른 hook 인스턴스와 동기화하는 훅
 *
 * localStorage를 컴포넌트에서 직접 읽고 쓰면 SSR 환경의 window 접근 오류, JSON parse 실패,
 * state와 localStorage 값 불일치, 탭 간 변경 미반영 같은 문제가 생길 수 있습니다.
 *
 * 이 훅은 useState와 비슷하게 [value, setValue, removeValue]를 반환합니다.
 * setValue는 localStorage에 값을 저장한 뒤 state를 갱신하고, removeValue는 key를 삭제한 뒤 initialValue로 되돌립니다.
 * 브라우저의 storage 이벤트와 커스텀 local-storage 이벤트를 구독해 다른 탭 또는 같은 문서의 다른 useLocalStorage 인스턴스도 함께 갱신합니다.
 *
 * 기본적으로 JSON.stringify/JSON.parse를 사용하며, serializer/deserializer 옵션으로 저장 형식을 바꿀 수 있습니다.
 * initializeWithValue를 false로 설정하면 첫 render에서는 initialValue를 사용하고, mount 이후 localStorage 값을 읽습니다.
 *
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 * setTheme('dark');
 * removeTheme();
 *
 * @param key - localStorage에 저장할 key
 * @param initialValue - 저장된 값이 없거나 읽기에 실패했을 때 사용할 초기값
 * @param options - serializer, deserializer, initializeWithValue 설정
 * @returns [storedValue, setValue, removeValue]
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const { initializeWithValue = true } = options;

  const serializer = useCallback<(value: T) => string>(
    (value) => {
      if (options.serializer) {
        return options.serializer(value);
      }

      return JSON.stringify(value);
    },
    [options],
  );

  const deserializer = useCallback<(value: string) => T>(
    (value) => {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      // Support 'undefined' as a value
      if (value === 'undefined') {
        return undefined as unknown as T;
      }

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch {
        return defaultValue; // Return initialValue if parsing fails
      }

      return parsed as T;
    },
    [options, initialValue],
  );

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    // Prevent build error "window is undefined" but keep working
    if (IS_SERVER) {
      return initialValueToUse;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch {
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue();
    }

    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: Dispatch<SetStateAction<T>> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      return;
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(readValue()) : value;

      // Save to local storage
      window.localStorage.setItem(key, serializer(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every similar useLocalStorage hook is notified
      window.dispatchEvent(new StorageEvent('local-storage', { key }));
    } catch {}
  });

  const removeValue = useEventCallback(() => {
    // Prevent build error "window is undefined" but keeps working
    if (IS_SERVER) {
      return;
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    // Remove the key from local storage
    window.localStorage.removeItem(key);

    // Save state with default value
    setStoredValue(defaultValue);

    // We dispatch a custom event so every similar useLocalStorage hook is notified
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue, removeValue];
}
