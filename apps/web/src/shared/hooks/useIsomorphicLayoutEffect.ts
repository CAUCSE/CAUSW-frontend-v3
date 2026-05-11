'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * @description 브라우저 환경과 서버 환경을 구분하여 useLayoutEffect 또는 useEffect를 사용하는 훅
 * @see https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
