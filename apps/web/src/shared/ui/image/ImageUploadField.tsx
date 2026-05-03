'use client';

import * as React from 'react';

import { type FieldValues } from 'react-hook-form';

import Image from 'next/image';

import { CloseFilled } from '@causw/cds';

import { IMAGE_UPLOAD_RULES, ACCEPTED_IMAGE_TYPES } from '@/shared/constants';
import { type ImageUploadFieldProps } from '@/shared/types';

export interface ImageUploadFieldRef {
  openFilePicker: () => void;
}

const ImageUploadFieldInner = <T extends FieldValues>(
  {
    name,
    setValue,
    maxFiles = IMAGE_UPLOAD_RULES.MAX_FILE_COUNT,
    resetTrigger,
    showMainBadge = false,
    initialImages = [],
    onInvalidTypeFile,
    onInvalidSizeFile,
    mapValue,
  }: Omit<ImageUploadFieldProps<T>, 'label' | 'errorMessage' | 'children'>,
  ref: React.ForwardedRef<ImageUploadFieldRef>,
) => {
  const [previews, setPreviews] = React.useState<string[]>(initialImages);
  const [existingImages, setExistingImages] =
    React.useState<string[]>(initialImages);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewsRef = React.useRef<string[]>([]);

  // previewsRef를 최신 상태로 유지
  React.useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);

  // 언마운트 시 Object URL 해제 (메모리 누수 방지)
  React.useEffect(() => {
    return () => {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // ref로 openFilePicker 노출
  React.useImperativeHandle(ref, () => ({
    openFilePicker: () => inputRef.current?.click(),
  }));

  // resetTrigger 변경 시 초기화
  React.useEffect(() => {
    if (resetTrigger !== undefined) {
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews(initialImages);
      setExistingImages(initialImages);
      setFiles([]);
      setValue(
        name,
        (mapValue
          ? mapValue({
              existingImages: initialImages,
              newImageFiles: [],
            })
          : []) as Parameters<typeof setValue>[1],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTrigger]);

  // files 변경 시 form에 반영
  React.useEffect(() => {
    setValue(
      name,
      (mapValue
        ? mapValue({
            existingImages,
            newImageFiles: files,
          })
        : {
            existingImages,
            newImageFiles: files,
          }) as Parameters<typeof setValue>[1],
      {
        shouldValidate: files.length > 0,
        shouldDirty: true,
        shouldTouch: true,
      },
    );
  }, [files, existingImages, name, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    let hasInvalidTypeFile = false;
    let hasInvalidSizeFile = false;

    for (const file of selectedFiles) {
      if (files.length + validFiles.length >= maxFiles) break;

      if (file.size > IMAGE_UPLOAD_RULES.MAX_FILE_SIZE) {
        hasInvalidSizeFile = true;
        continue;
      }

      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !IMAGE_UPLOAD_RULES.ALLOWED_EXTENSIONS.includes(ext)) {
        hasInvalidTypeFile = true;
        continue;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (hasInvalidTypeFile) {
      onInvalidTypeFile?.();
    }

    if (hasInvalidSizeFile) {
      onInvalidSizeFile?.();
    }

    setFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemoveExisting = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => {
        const existingCount = existingImages.length;
        return i >= existingCount || prev[i] !== existingImages[index];
      });
      return newPreviews.filter(
        (url) => !existingImages.includes(url) || url !== existingImages[index],
      );
    });
  };

  const handleRemoveNew = (index: number) => {
    const newImageStartIndex = existingImages.length;
    const newImageIndex = index - newImageStartIndex;
    if (newImageIndex >= 0) {
      URL.revokeObjectURL(previews[index]);
      setFiles((prev) => prev.filter((_, i) => i !== newImageIndex));
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (previews.length === 0 && existingImages.length === 0) {
    return (
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex h-25 gap-2 overflow-x-auto">
        {existingImages.map((url, index) => (
          <div
            key={`existing-${url}-${index}`}
            className="relative h-25 w-25 shrink-0 overflow-hidden rounded-lg bg-gray-200"
          >
            <Image
              src={url}
              alt={`기존 이미지 ${index + 1}`}
              fill
              className="object-cover"
            />

            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={() => handleRemoveExisting(index)}
              className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center"
              aria-label="이미지 삭제"
            >
              <CloseFilled size={18} color="gray-600" />
            </button>

            {/* 대표 사진 배지 */}
            {showMainBadge && index === 0 && (
              <div className="absolute right-0 bottom-0 left-0 flex h-7 items-center justify-center bg-gray-600">
                <span className="text-[0.875rem] leading-[160%] font-semibold tracking-[-0.02em] text-gray-50">
                  대표 사진
                </span>
              </div>
            )}
          </div>
        ))}
        {files.map((_, index) => {
          const previewIndex = existingImages.length + index;
          return (
            <div
              key={`new-${previewIndex}`}
              className="relative h-25 w-25 shrink-0 overflow-hidden rounded-lg bg-gray-200"
            >
              <Image
                src={previews[previewIndex]}
                alt={`새 이미지 ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* 삭제 버튼 */}
              <button
                type="button"
                onClick={() => handleRemoveNew(index)}
                className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center"
                aria-label="이미지 삭제"
              >
                <CloseFilled size={18} color="gray-600" />
              </button>

              {/* 대표 사진 배지 */}
              {showMainBadge && previewIndex === 0 && (
                <div className="absolute right-0 bottom-0 left-0 flex h-7 items-center justify-center bg-gray-600">
                  <span className="text-[0.875rem] leading-[160%] font-semibold tracking-[-0.02em] text-gray-50">
                    대표 사진
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export const ImageUploadField = React.forwardRef(ImageUploadFieldInner) as <
  T extends FieldValues,
>(
  props: Omit<
    ImageUploadFieldProps<T>,
    'label' | 'errorMessage' | 'children'
  > & {
    ref?: React.ForwardedRef<ImageUploadFieldRef>;
  },
) => React.ReactElement | null;
