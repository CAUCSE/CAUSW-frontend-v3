'use client';

import { useState } from 'react';

import { Grid } from '@causw/cds';

import { ImageSlider, ImageViewer } from '@/shared/ui';

interface PostImageProps {
  images: string[];
  enableViewer?: boolean;
}

export const PostImage = ({ images, enableViewer = true }: PostImageProps) => {
  const [viewerState, setViewerState] = useState({
    isOpen: false,
    activeIndex: 0,
  });

  if (!images || images.length === 0) return null;

  const handleImageClick = (index: number) => {
    setViewerState({
      isOpen: true,
      activeIndex: index,
    });
  };

  const handleCloseViewer = () => {
    setViewerState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <Grid columns={1}>
      <ImageSlider
        images={images}
        onImageClick={enableViewer ? handleImageClick : undefined}
      />

      {enableViewer && viewerState.isOpen && (
        <ImageViewer
          images={images}
          initialIndex={viewerState.activeIndex}
          onClose={handleCloseViewer}
        />
      )}
    </Grid>
  );
};
