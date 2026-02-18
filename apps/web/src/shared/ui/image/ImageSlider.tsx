'use client';

import * as React from 'react';

import Image from 'next/image';

import { getOptimizedImageUrl, awsImageLoader } from '@/shared/lib';
import { ImageSliderProps } from '@/shared/types';

export const ImageSlider = ({
  images,
  onImageClick,
}: ImageSliderProps) => {
  if (images.length === 0) return null;

  return (
    <div className="flex h-[13.75rem] gap-[0.6875rem] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          onClick={() => onImageClick?.(index)}
          className="relative h-[13.75rem] w-[13.75rem] flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white"
        >
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
        </button>
      ))}
    </div>
  );
};
