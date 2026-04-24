import type {
  PostCreateFormValues,
  PostCreateRequestDto,
  PostMetaImage,
  PostUpdateRequestDto,
} from '@/entities/post';

const mapFilesToPostMetaImages = (files: File[]): PostMetaImage[] =>
  files.map((_, index) => ({
    order: index,
    fileIndex: index,
    isRepresentative: index === 0,
  }));

/**
 * 게시글 작성 Form 데이터를 서버 요청 DTO 형태로 변환
 */
export const mapPostCreateFormToDto = (
  data: PostCreateFormValues,
): PostCreateRequestDto => {
  return {
    content: data.content,
    boardId: data.boardId,
    isAnonymous: data.isAnonymous,
    images: mapFilesToPostMetaImages(data.images),
  };
};

/**
 * 게시글 수정 Form 데이터를 서버 요청 DTO 형태로 변환
 */
export const mapPostUpdateFormToDto = (
  data: PostCreateFormValues,
): PostUpdateRequestDto => {
  return {
    content: data.content,
    isAnonymous: data.isAnonymous,
  };
};
