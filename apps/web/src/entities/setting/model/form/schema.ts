import { z } from 'zod';

import { ENROLLMENT_VERIFICATION_FORM_FIELD } from '@/entities/auth';
import { ACADEMIC_STATE_CHANGE_STATUS } from '@/entities/setting/config';

import { ACCEPTED_IMAGE_TYPES } from '@/shared/constants';
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

const MIN_GRADUATION_YEAR = 1950;
const MAX_GRADUATION_YEAR = new Date().getFullYear();
const ACCEPTED_IMAGE_TYPE_LIST = ACCEPTED_IMAGE_TYPES.split(',').map((type) =>
  type.trim(),
);

const graduationYearSchema = z
  .string()
  .min(4, '졸업년도 4자리를 입력해주세요.')
  .max(4, '졸업년도 4자리를 입력해주세요.')
  .regex(/^\d{4}$/, '졸업년도는 숫자 4자리여야 합니다.')
  .refine((value) => {
    const year = Number(value);

    return year >= MIN_GRADUATION_YEAR && year <= MAX_GRADUATION_YEAR;
  }, `졸업년도는 ${MIN_GRADUATION_YEAR}년도부터 ${MAX_GRADUATION_YEAR}년도 사이여야 합니다.`);

export const academicStateChangeFormSchema = z
  .object({
    [ENROLLMENT_VERIFICATION_FORM_FIELD.major]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.graduationYear]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.studentId]: z.string().optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.enrollmentState]: z
      .string()
      .min(1, '학적 상태를 선택해주세요.'),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.content]: z
      .string()
      .max(500, '특이사항은 500자 이내로 입력해주세요.')
      .optional(),
    [ENROLLMENT_VERIFICATION_FORM_FIELD.images]: z
      .array(z.instanceof(File))
      .max(3, '이미지는 최대 3개까지 첨부할 수 있습니다.')
      .optional(),
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
          message: '재학 증명 서류를 첨부해주세요.',
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

      return;
    }

    if (enrollmentState !== ACADEMIC_STATE_CHANGE_STATUS.GRADUATED.value) {
      return;
    }

    const result = graduationYearSchema.safeParse(
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

export type AcademicStateChangeFormData = z.infer<
  typeof academicStateChangeFormSchema
>;
