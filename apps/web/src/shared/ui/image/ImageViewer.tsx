'use client';

import * as React from 'react';

import Image from 'next/image';

import { Close, ChevronLeft, ChevronRight } from '@causw/cds';

import { getOriginalImageUrl, awsImageLoader, saveImage } from '@/shared/lib';
import { ImageViewerProps } from '@/shared/types';

const LONG_PRESS_DURATION = 500;
const LONG_PRESS_MOVE_THRESHOLD = 10;

export const ImageViewer = ({
  images,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  // 줌 상태
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const minZoom = 1;
  const maxZoom = 3;

  // 팬 상태
  const [panPosition, setPanPosition] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);
  const panStartRef = React.useRef({ x: 0, y: 0 });
  const panOffsetRef = React.useRef({ x: 0, y: 0 });

  // 캐러셀 상태
  const [offset, setOffset] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  // 터치 핸들링
  const touchStartX = React.useRef<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  // 핀치 줌 상태
  const initialPinchDistance = React.useRef<number | null>(null);
  const initialPinchZoom = React.useRef<number>(1);
  const [isPinching, setIsPinching] = React.useState(false);

  // long-press 상태
  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const longPressTouchStartRef = React.useRef({ x: 0, y: 0 });
  const longPressTriggeredRef = React.useRef(false);

  const isZoomed = zoomLevel > 1;
  const slidePercent = images.length > 0 ? 100 / images.length : 100;

  const goToPrevious = React.useCallback(() => {
    if (currentIndex === 0 || isTransitioning || isZoomed) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setOffset(0);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, isZoomed]);

  const goToNext = React.useCallback(() => {
    if (currentIndex === images.length - 1 || isTransitioning || isZoomed)
      return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setOffset(0);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, images.length, isTransitioning, isZoomed]);

  // long-press 헬퍼
  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleLongPressSave = async () => {
    cancelLongPress();
    longPressTriggeredRef.current = true;
    navigator.vibrate?.(50);

    try {
      await saveImage(images[currentIndex], currentIndex);
    } catch {
      // 사용자가 공유 시트를 취소한 경우 등
    }
  };

  // 열릴 때 상태 초기화
  React.useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
    setOffset(0);
    setIsTransitioning(false);
    setIsDragging(false);
    setPanPosition({ x: 0, y: 0 });
    setIsPanning(false);
    setIsPinching(false);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      cancelLongPress();
    };
  }, [initialIndex]);

  // 줌 리셋 시 팬 초기화
  React.useEffect(() => {
    if (zoomLevel === 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  // 키보드 네비게이션
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || isDragging) return;
      switch (e.key) {
        case 'Escape':
          if (isZoomed) {
            setZoomLevel(1);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (!isZoomed) goToPrevious();
          break;
        case 'ArrowRight':
          if (!isZoomed) goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, isDragging, isZoomed, onClose, goToPrevious, goToNext]);

  // 휠 줌 (데스크톱)
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!imageContainerRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      setZoomLevel((prev) =>
        Math.max(minZoom, Math.min(maxZoom, prev + delta)),
      );
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // 두 터치 포인트 간 거리 계산
  const getTouchDistance = (touches: React.TouchList): number => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY,
    );
  };

  // 터치 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;

    // 두 손가락 핀치 줌
    if (e.touches.length === 2) {
      cancelLongPress();
      initialPinchDistance.current = getTouchDistance(e.touches);
      initialPinchZoom.current = zoomLevel;
      setIsPinching(true);
      setIsDragging(false);
      return;
    }

    // 한 손가락 터치
    if (e.touches.length === 1) {
      longPressTriggeredRef.current = false;
      longPressTouchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      longPressTimerRef.current = setTimeout(
        handleLongPressSave,
        LONG_PRESS_DURATION,
      );

      if (isZoomed) {
        setIsPanning(true);
        panStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        panOffsetRef.current = { x: panPosition.x, y: panPosition.y };
      } else {
        touchStartX.current = e.touches[0].clientX;
        setIsDragging(true);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTransitioning) return;

    // long-press 이동 감지
    if (longPressTimerRef.current && e.touches.length === 1) {
      const dx = e.touches[0].clientX - longPressTouchStartRef.current.x;
      const dy = e.touches[0].clientY - longPressTouchStartRef.current.y;
      if (Math.hypot(dx, dy) > LONG_PRESS_MOVE_THRESHOLD) {
        cancelLongPress();
      }
    }

    // 핀치 줌
    if (e.touches.length === 2 && initialPinchDistance.current !== null) {
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / initialPinchDistance.current;
      const newZoom = Math.max(
        minZoom,
        Math.min(maxZoom, initialPinchZoom.current * scale),
      );
      setZoomLevel(newZoom);
      return;
    }

    // 한 손가락 터치
    if (e.touches.length === 1) {
      if (isZoomed && isPanning) {
        const deltaX = e.touches[0].clientX - panStartRef.current.x;
        const deltaY = e.touches[0].clientY - panStartRef.current.y;
        const maxPanX = window.innerWidth * 0.4 * (zoomLevel - 1);
        const maxPanY = window.innerHeight * 0.4 * (zoomLevel - 1);
        const newX = Math.max(
          -maxPanX,
          Math.min(maxPanX, panOffsetRef.current.x + deltaX),
        );
        const newY = Math.max(
          -maxPanY,
          Math.min(maxPanY, panOffsetRef.current.y + deltaY),
        );
        setPanPosition({ x: newX, y: newY });
      } else if (!isZoomed && isDragging && touchStartX.current !== null) {
        const currentX = e.touches[0].clientX;
        const distance = currentX - touchStartX.current;
        const containerWidth =
          containerRef.current?.offsetWidth || window.innerWidth;
        const percent = (distance / containerWidth) * slidePercent;
        setOffset(Math.max(-slidePercent, Math.min(slidePercent, percent)));
      }
    }
  };

  const handleTouchEnd = () => {
    cancelLongPress();

    // long-press 트리거 후 후속 처리 스킵
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      setIsPanning(false);
      setIsDragging(false);
      return;
    }

    // 핀치 줌 종료
    if (initialPinchDistance.current !== null || isPinching) {
      initialPinchDistance.current = null;
      setIsPinching(false);
      if (zoomLevel < 1.1) {
        setZoomLevel(1);
      }
      return;
    }

    // 팬 종료
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    // 스와이프 종료
    if (!isZoomed && isDragging) {
      setIsDragging(false);
      if (touchStartX.current === null) {
        setOffset(0);
        return;
      }

      const currentOffset = offset;
      touchStartX.current = null;
      const snapThreshold = slidePercent * 0.15;

      if (images.length > 1) {
        if (
          currentOffset < -snapThreshold &&
          currentIndex < images.length - 1
        ) {
          setIsTransitioning(true);
          setCurrentIndex((prev) => prev + 1);
          setOffset(0);
          setTimeout(() => setIsTransitioning(false), 300);
          return;
        } else if (currentOffset > snapThreshold && currentIndex > 0) {
          setIsTransitioning(true);
          setCurrentIndex((prev) => prev - 1);
          setOffset(0);
          setTimeout(() => setIsTransitioning(false), 300);
          return;
        }
      }

      setIsTransitioning(true);
      setOffset(0);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // 마우스 핸들러 (데스크톱 팬)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY };
    panOffsetRef.current = { x: panPosition.x, y: panPosition.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !isPanning) return;
    const deltaX = e.clientX - panStartRef.current.x;
    const deltaY = e.clientY - panStartRef.current.y;
    const maxPanX = window.innerWidth * 0.4 * (zoomLevel - 1);
    const maxPanY = window.innerHeight * 0.4 * (zoomLevel - 1);
    const newX = Math.max(
      -maxPanX,
      Math.min(maxPanX, panOffsetRef.current.x + deltaX),
    );
    const newY = Math.max(
      -maxPanY,
      Math.min(maxPanY, panOffsetRef.current.y + deltaY),
    );
    setPanPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // 더블탭/클릭 줌
  const lastTapRef = React.useRef<number>(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (isZoomed) {
        setZoomLevel(1);
      } else {
        setZoomLevel(2);
      }
    }
    lastTapRef.current = now;
  };

  if (images.length === 0) return null;

  const trackTransform = isZoomed
    ? `translateX(-${currentIndex * slidePercent}%)`
    : `translateX(${-currentIndex * slidePercent + offset}%)`;

  // 버튼 공통 스타일
  const buttonClass =
    'flex items-center justify-center rounded-full bg-gray-800 text-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black" />

      {/* 닫기 버튼 - 좌상단 */}
      <button
        onClick={onClose}
        className={`absolute top-16 left-4 z-50 h-8 w-8 md:top-11 md:left-11 md:h-11 md:w-11 ${buttonClass}`}
        aria-label="닫기"
      >
        <Close className="h-[1.125rem] w-[1.125rem] md:h-6 md:w-6" />
      </button>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex h-full w-full items-center">
        {/* 이전 버튼 - 데스크탑만, 좌측 중앙 */}
        {images.length > 1 && !isZoomed && currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 left-11 z-20 hidden h-11 w-11 -translate-y-1/2 md:flex ${buttonClass}`}
            aria-label="이전 이미지"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* 이미지 캐러셀 컨테이너 */}
        <div
          ref={containerRef}
          className={`h-full flex-1 touch-none overflow-hidden ${
            isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
          } ${isPanning ? 'cursor-grabbing' : ''}`}
          onClick={handleDoubleTap}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 캐러셀 트랙 */}
          <div
            className={`flex h-full items-center ${
              isTransitioning
                ? 'transition-transform duration-300 ease-out'
                : ''
            }`}
            style={{
              width: `${images.length * 100}%`,
              transform: trackTransform,
            }}
          >
            {images.map((img, i) => {
              const isCurrent = i === currentIndex;
              return (
                <div
                  key={img}
                  className="flex h-full items-center justify-center p-4 md:p-8"
                  style={{ width: `${slidePercent}%` }}
                >
                  <div
                    ref={isCurrent ? imageContainerRef : undefined}
                    className={`relative ${
                      isCurrent && !isPanning && !isPinching
                        ? 'transition-transform duration-200'
                        : ''
                    }`}
                    style={{
                      maxWidth: isCurrent && isZoomed ? 'none' : '90vw',
                      maxHeight: isCurrent && isZoomed ? 'none' : '85vh',
                      transform: isCurrent
                        ? `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
                        : undefined,
                    }}
                  >
                    <Image
                      loader={awsImageLoader}
                      src={getOriginalImageUrl(img)}
                      alt={`이미지 ${i + 1}`}
                      width={1200}
                      height={800}
                      className={`h-auto max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl${isCurrent ? 'select-none' : ''}`}
                      draggable={false}
                      priority={isCurrent}
                      loading={
                        Math.abs(i - currentIndex) <= 1 ? 'eager' : 'lazy'
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 다음 버튼 - 데스크탑만, 우측 중앙 */}
        {images.length > 1 && !isZoomed && currentIndex < images.length - 1 && (
          <button
            onClick={goToNext}
            className={`absolute top-1/2 right-11 z-20 hidden h-11 w-11 -translate-y-1/2 md:flex ${buttonClass}`}
            aria-label="다음 이미지"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};
