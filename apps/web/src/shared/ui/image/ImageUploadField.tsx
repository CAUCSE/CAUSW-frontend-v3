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

const resizeImage = async (file: File, maxSize: number): Promise<File> => {
  if (file.size <= maxSize) {
    return file;
  }

  const workerCode = `
    self.onmessage = async (event) => {
      const resizeScale = 0.9;
      const { file, maxSize } = event.data;
      let original;
      let bitmap;

      try {
        original = await createImageBitmap(file, {
          colorSpaceConversion: 'none',
          premultiplyAlpha: 'none',
        });

        let width = original.width;
        let height = original.height;

        original.close();
        original = null;

        let resizeCount = 0;

        while (true) {
          resizeCount = resizeCount + 1;
          width = Math.max(1, Math.floor(width * (resizeScale ** resizeCount)));
          height = Math.max(1, Math.floor(height * (resizeScale ** resizeCount)));

          bitmap = await createImageBitmap(file, {
            resizeWidth: width,
            resizeHeight: height,
            resizeQuality: 'high',
            colorSpaceConversion: 'none',
            premultiplyAlpha: 'none',
          });

          const canvas = new OffscreenCanvas(
            bitmap.width,
            bitmap.height,
          );

          const ctx = canvas.getContext('2d', {
            alpha: true,
            colorSpace: 'display-p3',
          });

          ctx.drawImage(bitmap, 0, 0);

          bitmap.close();
          bitmap = null;

          const blob = await canvas.convertToBlob({ type: 'image/png' });

          if (blob.size <= maxSize) {
            self.postMessage({ blob });
            return;
          }
        }
      } catch (error) {
        self.postMessage({
          error: error instanceof Error
            ? error.message
            : 'image resize failed',
        });
      } finally {
        original?.close();
        bitmap?.close();
      }
    };
  `;

  const workerBlob = new Blob([workerCode], {
    type: 'text/javascript',
  });
  const workerUrl = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerUrl);

  URL.revokeObjectURL(workerUrl);

  try {
    const result = await new Promise<{
      blob?: Blob;
      error?: string;
    }>((resolve, reject) => {
      worker.onmessage = (event) => {
        const data = event.data;

        if (data.error) {
          reject(new Error(data.error));
        } else {
          resolve(data);
        }
      };

      worker.onerror = (event) => {
        reject(new Error(event.message));
      };

      worker.postMessage({ file, maxSize });
    });

    if (!result.blob) {
      throw new Error('worker returned no blob');
    }

    return new File([result.blob], `${file.name}.png`, { type: 'image/png' });
  } finally {
    worker.terminate();
  }
};

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
  const [previews, setPreviews] = React.useState<string[]>(initialImages); // 화면에 표시할 이미지 URL 목록 (기존 URL + 새 파일의 blob URL 순서)
  const [existingImages, setExistingImages] =
    React.useState<string[]>(initialImages); // 서버에 이미 존재하는 기존 이미지 URL 목록
  const [files, setFiles] = React.useState<File[]>([]); // 새로 업로드할 이미지 파일 객체 목록
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    let hasInvalidTypeFile = false;
    let hasInvalidSizeFile = false;

    for (const file of selectedFiles) {
      if (files.length + validFiles.length >= maxFiles) break;

      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !IMAGE_UPLOAD_RULES.ALLOWED_EXTENSIONS.includes(ext)) {
        hasInvalidTypeFile = true;
        continue;
      }

      let resizedFile = file;

      if (file.size > IMAGE_UPLOAD_RULES.MAX_FILE_SIZE) {
        try {
          resizedFile = await resizeImage(
            file,
            IMAGE_UPLOAD_RULES.MAX_FILE_SIZE,
          );
        } catch {
          hasInvalidSizeFile = true;
          continue;
        }
      }

      validFiles.push(resizedFile);
      newPreviews.push(URL.createObjectURL(resizedFile));
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
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index: number) => {
    const previewIndex = existingImages.length + index;

    URL.revokeObjectURL(previews[previewIndex]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== previewIndex));
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
            className="relative size-25 shrink-0 overflow-hidden rounded-lg bg-gray-200"
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
              className="relative size-25 shrink-0 overflow-hidden rounded-lg bg-gray-200"
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
