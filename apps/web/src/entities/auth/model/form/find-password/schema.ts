import { z } from 'zod';

import { emailSchema } from '@/shared/model';

export const findPasswordSchema = z.object({
  email: emailSchema,
  verificationCode: z.string().length(6, '인증코드 6자리를 입력해주세요.'),
});

export type FindPasswordFormData = z.infer<typeof findPasswordSchema>;
