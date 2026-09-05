'use client';

import { useState } from 'react';

import { Grid } from '@causw/cds';

import { ImageSlider } from './ImageSlider';
import { ImageViewer } from './ImageViewer';

interface ImageGalleryProps {
  images?: string[] | null;
  enableViewer?: boolean;
}

/**
 * 이미지 목록을 가로 슬라이더로 보여주고,
 * 클릭 시 전체 화면 뷰어를 여는 컴포넌트입니다.
 *
 * @example
 * <ImageGallery images={detail.attachedImageUrlList} />
 */
export const ImageGallery = ({
  images,
  enableViewer = true,
}: ImageGalleryProps) => {
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
