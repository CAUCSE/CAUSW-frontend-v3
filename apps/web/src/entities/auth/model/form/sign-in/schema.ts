import { z } from 'zod';

import { emailSchema, passwordSchema } from '@/shared/model';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;
