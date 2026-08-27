'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const voteWriteOptionSchema = z.object({
  id: z.string(),
  value: z.string(),
});

export const voteWriteValueSchema = z.object({
  options: z.array(voteWriteOptionSchema),
  endTime: z.date().nullable(),
  allowMultiple: z.boolean(),
});

export const postCreateSchema = z
  .object({
    content: z.string().min(1, '내용을 입력해주세요.'),
    boardId: z.string().min(1, '주제를 선택해주세요'),
    images: z.custom<File[]>(),
    vote: voteWriteValueSchema.nullable().optional(),
    isAnonymous: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.vote) {
      // 빈 문자열이 아닌 유효한 옵션 개수 계산
      const validOptionsCount = data.vote.options.filter(
        (opt) => opt.value.trim().length > 0,
      ).length;

      // 유효한 옵션이 2개 미만일 경우 검증 실패 처리
      if (validOptionsCount < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '투표 항목은 최소 2개 이상 입력해야 합니다.',
          path: ['vote'], // 에러가 발생한 필드 경로
        });
      }
    }
  });

export type PostCreateFormValues = z.infer<typeof postCreateSchema>;
export type PostUpdateFormValues = PostCreateFormValues & {
  existingImages?: string[];
  newImageFiles?: File[];
};

export const usePostCreateForm = (
  defaultValues?: Partial<PostCreateFormValues>,
) => {
  return useForm<PostCreateFormValues>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      content: '',
      boardId: '',
      images: [],
      isAnonymous: true,
      vote: null,
      ...defaultValues,
    },
    mode: 'onChange',
  });
};
