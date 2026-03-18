import { PostCreateFormValues, PostCreateRequestDto } from '@/entities/post';

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
  };
};
