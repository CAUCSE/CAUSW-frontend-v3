import { PostCreateFormValues, PostCreateRequestDto } from '@/entities/post';

/**
 * 게시글 작성 Form 데이터를 서버 요청 DTO 형태로 변환하는 함수
 *
 * Form 데이터(PostCreateFormValues)는 UI에서 사용하는 구조이며
 * 이미지, 투표 등 서버 요청과 직접적으로 매칭되지 않는 필드가 포함될 수 있습니다.
 *
 * 따라서 실제 게시글 생성 API에 필요한 데이터만 추려
 * PostCreateRequestDto 형태로 매핑합니다.
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
