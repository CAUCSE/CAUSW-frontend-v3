'use client';

import { useState, useCallback, useRef } from 'react';

import type { ImageUploadFieldRef } from '@/shared/ui/image';

export const useImageUpload = () => {
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);
  const [photoResetTrigger, setPhotoResetTrigger] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const handleSetPhotoFiles = useCallback((_name: string, value: unknown) => {
    if (Array.isArray(value)) {
      setPhotoFiles(value);
      return;
    }

    if (
      value &&
      typeof value === 'object' &&
      'newImageFiles' in value &&
      Array.isArray(value.newImageFiles)
    ) {
      setPhotoFiles(value.newImageFiles);
      return;
    }

    setPhotoFiles([]);
  }, []);

  const resetImageUpload = () => {
    setPhotoFiles([]);
    setPhotoResetTrigger((prev) => !prev);
  };

  return {
    imageUploadRef,
    photoFiles,
    photoResetTrigger,
    handleSetPhotoFiles,
    resetImageUpload,
  };
};
