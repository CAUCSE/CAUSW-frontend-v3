'use client';

import { ImageGallery } from '@/shared/ui';

interface PostImageProps {
  images: string[];
  enableViewer?: boolean;
  sliderClassName?: string;
}

export const PostImage = ({
  images,
  enableViewer = true,
  sliderClassName,
}: PostImageProps) => {
  return (
    <ImageGallery
      images={images}
      enableViewer={enableViewer}
      sliderClassName={sliderClassName}
    />
  );
};
