import { z } from 'zod';

import { nicknameSchema, passwordSchema } from '@/shared/model';

export const passwordChangeFormSchema = z
  .object({
    currentPassword: passwordSchema,
    nextPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.nextPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeFormSchema>;

export const nicknameChangeFormSchema = z.object({
  nickname: nicknameSchema,
});

export type NicknameChangeFormData = z.infer<typeof nicknameChangeFormSchema>;
