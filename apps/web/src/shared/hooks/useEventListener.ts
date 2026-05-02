'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * @description window, document, element, MediaQueryList에 DOM 이벤트 리스너를 등록하고 cleanup까지 처리하는 훅
 *
 * addEventListener/removeEventListener를 useEffect마다 직접 작성하면 cleanup 누락이나 handler 참조 불일치로 이벤트가 중복 등록될 수 있습니다.
 * 또한 handler가 props/state를 참조할 때 이전 render 값을 바라보는 stale closure 문제가 생길 수 있습니다.
 *
 * 이 훅은 컴포넌트 mount 시점에 이벤트를 등록하고 unmount 시점에 제거합니다.
 * handler는 ref로 최신 값을 유지하므로 이벤트 리스너를 매번 다시 등록하지 않아도 호출 시점의 최신 handler가 실행됩니다.
 *
 * React가 관리하는 JSX 이벤트(onClick, onChange 등)에는 사용하지 말고,
 * window resize, document visibilitychange, element scroll, storage event처럼 React 밖에서 발생하는 브라우저 이벤트를 구독할 때 사용합니다.
 *
 * @example
 * useEventListener('resize', () => {
 *   setWidth(window.innerWidth);
 * });
 *
 * @param eventName - 구독할 DOM 이벤트 이름
 * @param handler - 이벤트가 발생했을 때 실행할 핸들러
 * @param element - 이벤트를 등록할 대상 ref. 생략하면 window에 등록합니다.
 * @param options - addEventListener에 전달할 옵션
 * @see https://usehooks-ts.com/react-hook/use-event-listener
 */
// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions,
): void;

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

// Element Event based useEventListener interface
function useEventListener<
  K extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends Element = K extends keyof HTMLElementEventMap
    ? HTMLDivElement
    : SVGElement,
>(
  eventName: K,
  handler:
    | ((event: HTMLElementEventMap[K]) => void)
    | ((event: SVGElementEventMap[K]) => void),
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | SVGElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) return;

    // Create event listener that calls handler function stored in ref
    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export { useEventListener };
