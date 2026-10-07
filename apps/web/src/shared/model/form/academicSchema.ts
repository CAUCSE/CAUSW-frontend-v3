import { z } from 'zod';

import {
  ACADEMIC_FORM_LIMITS,
  ACADEMIC_IMAGE_COUNT_MESSAGE,
} from '@/shared/constants';

export const academicYearSchema = (label: '입학 연도' | '졸업 연도') =>
  z.string().superRefine((value, ctx) => {
    if (!/^\d{4}$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label}는 숫자 4자리로 입력해 주세요.`,
      });
      return;
    }

    const maxYear = new Date().getFullYear();
    const year = Number(value);
    if (year < ACADEMIC_FORM_LIMITS.MIN_YEAR || year > maxYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label}는 ${ACADEMIC_FORM_LIMITS.MIN_YEAR}년부터 ${maxYear}년 사이여야 합니다.`,
      });
    }
  });

export const academicImagesSchema = z
  .array(z.instanceof(File))
  .max(ACADEMIC_FORM_LIMITS.MAX_IMAGES, ACADEMIC_IMAGE_COUNT_MESSAGE);
