import { z } from 'zod';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  ENROLLMENT_VERIFICATION_FORM_FIELD,
} from '@/entities/auth/config';

import {
  ACADEMIC_FORM_LIMITS,
  ACCEPTED_IMAGE_TYPE_LIST,
  IMAGE_TYPE_ERROR_MESSAGE,
} from '@/shared/constants';
import { academicYearSchema, academicImagesSchema } from '@/shared/model';

export const enrollmentVerificationSchema = z
  .object({
    [ENROLLMENT_VERIFICATION_FORM_FIELD.major]: z
      .string()
      .min(1, '학과를 선택해 주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear]:
      academicYearSchema('입학 연도'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState]: z
      .string()
      .min(1, '재학 분류를 선택해 주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.content]: z
      .string()
      .max(
        ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH,
        `증빙 서류 내용은 ${ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH}자 이내로 입력해 주세요.`,
      )
      .optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.images]:
      academicImagesSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const images = data[ENROLLMENT_VERIFICATION_FORM_FIELD.images];
    const enrollmentState =
      data[ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState];
    const studentId = data[ENROLLMENT_VERIFICATION_FORM_FIELD.studentId];

    if (!images || images.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [ENROLLMENT_VERIFICATION_FORM_FIELD.images],
        message: '증빙 서류 이미지를 최소 1장 첨부해 주세요.',
      });
    }

    if (
      images &&
      !images.every((file) => ACCEPTED_IMAGE_TYPE_LIST.includes(file.type))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [ENROLLMENT_VERIFICATION_FORM_FIELD.images],
        message: IMAGE_TYPE_ERROR_MESSAGE,
      });
    }

    if (
      enrollmentState !==
      ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value
    ) {
      if (!studentId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId],
          message: '학번을 입력해 주세요.',
        });
        return;
      }

      if (!/^\d+$/.test(studentId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId],
          message: '학번은 숫자만 입력 가능합니다.',
        });
      }

      return;
    }

    const result = academicYearSchema('졸업 연도').safeParse(
      data[ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear] ?? '',
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
