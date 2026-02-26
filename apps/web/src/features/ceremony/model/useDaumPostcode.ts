'use client';

import { useState, useRef, useEffect } from 'react';

import type { UseFormSetValue } from 'react-hook-form';

import type { CeremonyFormData } from '@/entities/ceremony';

import { loadDaumPostcode } from '@/shared/lib/daum-postcode';

export const useDaumPostcode = (
  setValue: UseFormSetValue<CeremonyFormData>,
) => {
  const [showPostcode, setShowPostcode] = useState(false);
  const postcodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPostcode) return;
    loadDaumPostcode().then(() => {
      const container = postcodeRef.current;
      if (!container) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 다음 우편번호 SDK에 타입 정의 없음
      new (window as any).daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          setValue('postalCode', data.zonecode);
          setValue('address', data.address);
          setShowPostcode(false);
        },
        width: '100%',
        height: '100%',
      }).embed(container);
    });
  }, [showPostcode, setValue]);

  return { showPostcode, setShowPostcode, postcodeRef };
};
