'use client';

import { createContext, type RefObject } from 'react';

export type AlumniContactsHeaderBoundaryContextProps = {
  alumniContactsHeroRef: RefObject<HTMLDivElement | null>;
};

export const AlumniContactsHeaderBoundaryContext =
  createContext<AlumniContactsHeaderBoundaryContextProps | null>(null);
