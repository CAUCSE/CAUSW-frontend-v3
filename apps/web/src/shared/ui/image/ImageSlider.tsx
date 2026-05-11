'use client';

import * as React from 'react';

import Image from 'next/image';

import { getOptimizedImageUrl, awsImageLoader } from '@/shared/lib';
import { type ImageSliderProps } from '@/shared/types';

export const ImageSlider = ({ images, onImageClick }: ImageSliderProps) => {
  if (images.length === 0) return null;

  return (
    <div className="flex h-55 gap-2.75 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => {
        const content = (
          <Image
            loader={awsImageLoader}
            src={getOptimizedImageUrl(image, { width: 440 })}
            alt={`이미지 ${index + 1}`}
            fill
            className="object-cover"
            draggable={false}
            sizes="13.75rem"
            priority={index === 0}
          />
        );

        // 게시글 목록 화면에서 버튼 간의 중첩 문제가 발생하여 조건부 렌더링 처리
        if (!onImageClick) {
          return (
            <div
              key={image}
              className="relative h-55 w-55 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white"
            >
              {content}
            </div>
          );
        }

        return (
          <button
            key={image}
            type="button"
            onClick={() => onImageClick(index)}
            className="relative h-55 w-55 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};
