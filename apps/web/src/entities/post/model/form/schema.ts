import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const postCreateSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.'),
  isAnonymous: z.boolean(),
  images: z.custom<File[]>(),
});

export type PostCreateFormValues = z.infer<typeof postCreateSchema>;

export const usePostCreateForm = () => {
  return useForm<PostCreateFormValues>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      content: '',
      isAnonymous: true,
      images: [],
    },
    mode: 'onChange',
  });
};
