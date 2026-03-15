import { useMutation } from '@tanstack/react-query';

import { PostCreateRequestDto, PostCreateResponseDto } from '@/entities/post';

import { toast } from '@/shared/model';

import { createPost } from '../../api';

interface CreatePostParams {
  postCreateRequest: PostCreateRequestDto;
  attachImageList: File[];
}

export const useCreatePostMutation = () => {
  return useMutation<PostCreateResponseDto, Error, CreatePostParams>({
    mutationFn: ({ postCreateRequest, attachImageList }) =>
      createPost(postCreateRequest, attachImageList),
    onError: () => {
      toast.error('게시글 작성에 실패했어요.');
    },
  });
};
