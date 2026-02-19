import { z } from 'zod';

import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneNumberSchema,
  nicknameSchema,
} from '@/shared/model';

export const accountSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export const infoSchema = z.object({
  name: nameSchema,
  phoneNumber: phoneNumberSchema,
  nickname: nicknameSchema,
});

// 전체 스키마 (필요시 병합해서 사용)
export const signUpSchema = z.intersection(accountSchema, infoSchema);

export type AccountFormData = z.infer<typeof accountSchema>;
export type InfoFormData = z.infer<typeof infoSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
