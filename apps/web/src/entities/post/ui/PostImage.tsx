'use client';

import { ImageGallery } from '@/shared/ui';

interface PostImageProps {
  images: string[];
  enableViewer?: boolean;
}

export const PostImage = ({ images, enableViewer = true }: PostImageProps) => {
  return <ImageGallery images={images} enableViewer={enableViewer} />;
};
