'use client';

import { useEffect, useRef, useState } from 'react';

import { Spinner } from '@causw/cds';

import { loadKakaoMapSDK } from '@/shared/lib';
import { KAKAO_JS_KEY } from '@/shared/storage';

interface KakaoMapProps {
  address: string;
  className?: string;
}

export const KakaoMap = ({ address, className }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!KAKAO_JS_KEY) return;

    const initMap = async () => {
      try {
        await loadKakaoMapSDK();

        if (!mapRef.current) return;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (
            status !== window.kakao.maps.services.Status.OK ||
            result.length === 0
          ) {
            setError('주소를 찾을 수 없습니다');
            setIsLoading(false);
            return;
          }

          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );

          const map = new window.kakao.maps.Map(mapRef.current!, {
            center: coords,
            level: 3,
          });

          new window.kakao.maps.Marker({ map, position: coords });

          setIsLoading(false);
        });
      } catch {
        setError('카카오 지도를 불러올 수 없습니다');
        setIsLoading(false);
      }
    };

    initMap();
  }, [address]);

  if (!KAKAO_JS_KEY || error) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden ${className ?? 'h-40 rounded-[0.5rem]'}`}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200">
          <Spinner />
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};
