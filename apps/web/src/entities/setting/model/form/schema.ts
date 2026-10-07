import { z } from 'zod';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';
import { ACADEMIC_STATE_CHANGE_STATUS } from '@/entities/setting/config';

import {
  ACADEMIC_FORM_LIMITS,
  ACCEPTED_IMAGE_TYPE_LIST,
  IMAGE_TYPE_ERROR_MESSAGE,
} from '@/shared/constants';
import {
  academicYearSchema,
  academicImagesSchema,
  nicknameSchema,
  passwordSchema,
} from '@/shared/model';

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

export const academicStateChangeFormSchema = z
  .object({
    [ENROLLMENT_VERIFICATION_FORM_FIELD.major]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState]: z
      .string()
      .min(1, '학적 상태를 선택해 주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.content]: z
      .string()
      .max(
        ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH,
        `특이사항은 ${ACADEMIC_FORM_LIMITS.MAX_CONTENT_LENGTH}자 이내로 입력해 주세요.`,
      )
      .optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.images]:
      academicImagesSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const enrollmentState =
      data[ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState];
    const images = data[ENROLLMENT_VERIFICATION_FORM_FIELD.images];

    if (enrollmentState === ACADEMIC_STATE_CHANGE_STATUS.ENROLLED.value) {
      if (!images || images.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [ENROLLMENT_VERIFICATION_FORM_FIELD.images],
          message: '재학 증빙 서류를 업로드해 주세요.',
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

      return;
    }

    if (enrollmentState !== ACADEMIC_STATE_CHANGE_STATUS.GRADUATED.value) {
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

export type AcademicStateChangeFormData = z.infer<
  typeof academicStateChangeFormSchema
>;
