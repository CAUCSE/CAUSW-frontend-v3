'use client';

import { useState, useCallback, useRef } from 'react';

import type { ImageUploadFieldRef } from '@/shared/ui/image';

export const useImageUpload = () => {
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);
  const [photoResetTrigger, setPhotoResetTrigger] = useState(false);
  const [, setPhotoFiles] = useState<File[]>([]);

  const handleSetPhotoFiles = useCallback((_name: string, value: unknown) => {
    setPhotoFiles(value as File[]);
  }, []);

  const resetImageUpload = () => {
    setPhotoFiles([]);
    setPhotoResetTrigger((prev) => !prev);
  };

  return {
    imageUploadRef,
    photoResetTrigger,
    handleSetPhotoFiles,
    resetImageUpload,
  };
};
