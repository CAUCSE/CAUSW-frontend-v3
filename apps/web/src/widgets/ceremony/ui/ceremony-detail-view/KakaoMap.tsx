'use client';

import { useEffect, useRef, useState } from 'react';

import { Spinner } from '@causw/cds';

import { KAKAO_JS_KEY } from '@/shared/storage';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number },
        ) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: { map: unknown; position: unknown }) => unknown;
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: { x: string; y: string }[],
                status: string,
              ) => void,
            ) => void;
          };
          Status: { OK: string };
        };
      };
    };
  }
}

const KAKAO_MAP_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services&autoload=false`;

const loadKakaoMapSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_MAP_SDK_URL;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = () => reject(new Error('카카오 지도 SDK 로드 실패'));
    document.head.appendChild(script);
  });
};

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
    <div className={`relative overflow-hidden rounded-xl ${className ?? ''}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <Spinner />
        </div>
      )}
      <div ref={mapRef} className="h-48 w-full" />
    </div>
  );
};
