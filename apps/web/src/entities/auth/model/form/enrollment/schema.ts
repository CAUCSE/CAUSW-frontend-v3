import { z } from 'zod';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth/config';

import { ACCEPTED_IMAGE_TYPES } from '@/shared/constants';

const MIN_ENROLLMENT_YEAR = 1950;
const MAX_ENROLLMENT_YEAR = new Date().getFullYear();
const ACCEPTED_IMAGE_TYPE_LIST = ACCEPTED_IMAGE_TYPES.split(',').map((type) =>
  type.trim(),
);

const yearSchema = (label: '입학년도' | '졸업년도') =>
  z
    .string()
    .min(4, `${label} 4자리를 입력해주세요.`)
    .max(4, `${label} 4자리를 입력해주세요.`)
    .regex(/^\d{4}$/, `${label}는 숫자 4자리여야 합니다.`)
    .refine((value) => {
      const year = Number(value);

      return year >= MIN_ENROLLMENT_YEAR && year <= MAX_ENROLLMENT_YEAR;
    }, `${label}는 ${MIN_ENROLLMENT_YEAR}년부터 ${MAX_ENROLLMENT_YEAR}년 사이여야 합니다.`);

export const enrollmentVerificationSchema = z
  .object({
    [ENROLLMENT_VERIFICATION_FORM_FIELD.major]: z
      .string()
      .min(1, '학과를 선택해주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear]: yearSchema('입학년도'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId]: z
      .string()
      .min(1, '학번을 입력해주세요.')
      .regex(/^\d+$/, '학번은 숫자만 입력 가능합니다.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState]: z
      .string()
      .min(1, '재학 분류를 선택해주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.content]: z
      .string()
      .max(500, '증빙서류 내용은 500자 이내로 입력해주세요.')
      .optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.images]: z
      .array(z.instanceof(File))
      .max(3, '이미지는 최대 3장까지 첨부할 수 있습니다.')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const images = data[ENROLLMENT_VERIFICATION_FORM_FIELD.images];

    if (!images || images.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [ENROLLMENT_VERIFICATION_FORM_FIELD.images],
        message: '증빙서류 이미지를 최소 1장 첨부해주세요.',
      });
    }

    if (
      images &&
      !images.every((file) => ACCEPTED_IMAGE_TYPE_LIST.includes(file.type))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [ENROLLMENT_VERIFICATION_FORM_FIELD.images],
        message: 'JPG, JPEG, PNG, GIF, BMP 이미지 파일만 첨부할 수 있습니다.',
      });
    }

    if (
      data[ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState] !==
      ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value
    )
      return;

    const result = yearSchema('졸업년도').safeParse(
      data[ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear],
    );

    if (result.success) return;

    result.error.issues.forEach((issue) => {
      ctx.addIssue({
        ...issue,
        path: [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear],
      });
    });
  });

export type EnrollmentVerificationFormData = z.infer<
  typeof enrollmentVerificationSchema
>;
