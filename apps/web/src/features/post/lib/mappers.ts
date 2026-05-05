import type {
  PostCreateFormValues,
  PostCreateRequestDto,
  PostImageMeta,
  PostMetaImage,
  PostUpdateFormValues,
  PostUpdateRequestDto,
} from '@/entities/post';

const mapFilesToPostMetaImages = (files?: File[]): PostMetaImage[] => {
  if (!files || !Array.isArray(files)) {
    return [];
  }

  return files.map((_, index) => ({
    order: index,
    fileIndex: index,
    isRepresentative: index === 0,
  }));
};

export const mapPostCreateFormToDto = (
  data: PostCreateFormValues,
  newImageFiles: File[],
): PostCreateRequestDto => {
  return {
    content: data.content,
    boardId: data.boardId,
    isAnonymous: data.isAnonymous,
    images: mapFilesToPostMetaImages(newImageFiles),
  };
};

export const mapPostUpdateFormToDto = (
  data: PostUpdateFormValues,
): PostUpdateRequestDto => {
  const existingImages: PostImageMeta[] = (data.existingImages ?? []).map(
    (url, index) => ({
      type: 'existing' as const,
      order: index,
      isRepresentative: index === 0,
      url,
    }),
  );

  const newImages: PostImageMeta[] = (data.newImageFiles ?? []).map(
    (_, index) => ({
      type: 'new' as const,
      order: (data.existingImages?.length ?? 0) + index,
      isRepresentative: (data.existingImages?.length ?? 0) === 0 && index === 0,
      fileIndex: index,
    }),
  );

  return {
    content: data.content,
    isAnonymous: data.isAnonymous,
    images: [...existingImages, ...newImages],
  };
};
