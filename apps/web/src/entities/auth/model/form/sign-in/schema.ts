import { z } from 'zod';

import { emailSchema, passwordSchema } from '@/shared/model';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
