import { z } from 'zod';

import { nameSchema, phoneNumberSchema } from '@/shared/model';

export const findEmailSchema = z.object({
  name: nameSchema,
  phoneNumber: phoneNumberSchema,
});

export type FindEmailFormData = z.infer<typeof findEmailSchema>;
