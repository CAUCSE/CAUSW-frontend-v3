'use client';

import { useCallback, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * @description 함수 참조는 고정해두고, 내부에서 실행되는 로직은 항상 최신 fn을 참조하도록 하는 훅
 *
 * useCallback의 dependency를 비워두면 이전 render의 props/state를 참조하는 stale closure 문제가 생길 수 있고,
 * dependency를 모두 넣으면 값이 바뀔 때마다 callback 참조도 함께 바뀌어 memoized child, event listener, effect dependency에 영향을 줄 수 있습니다.
 *
 * 이 훅은 반환하는 callback 참조를 안정적으로 유지하면서, 호출 시점에는 최신 fn을 실행해야 하는 이벤트 핸들러에 사용합니다.
 * 렌더링 중 호출되는 함수나 렌더 결과를 계산하는 함수에는 사용하지 마세요.
 *
 * @example
 * const handleClick = useEventCallback(() => {
 *   updateLatestCount(count); // 항상 최신 count 참조
 * });
 *
 * @param fn - 이벤트 핸들러 함수
 * @see https://usehooks-ts.com/react-hook/use-event-callback
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R;
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined;
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current?.(...args), [ref]) as (
    ...args: Args
  ) => R;
}
