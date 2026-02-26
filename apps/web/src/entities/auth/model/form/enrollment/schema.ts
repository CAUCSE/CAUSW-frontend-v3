import { z } from 'zod';

export const enrollmentVerificationSchema = z.object({
  major: z.string().min(1, '학과를 선택해주세요.'),
  enrollmentYear: z
    .string()
    .min(4, '입학년도 4자리를 입력해주세요.')
    .max(4, '입학년도 4자리를 입력해주세요.')
    .regex(/^\d{4}$/, '입학년도는 숫자 4자리여야 합니다.'),
  studentId: z
    .string()
    .min(1, '학번을 입력해주세요.')
    .regex(/^\d+$/, '학번은 숫자만 입력 가능합니다.'),
  enrollmentState: z.string().min(1, '재학 분류를 선택해주세요.'),
  content: z
    .string()
    .max(500, '증빙서류 내용은 500자 이내로 입력해주세요.')
    .optional(),
  images: z
    .array(z.any())
    .max(3, '이미지는 최대 3장까지 첨부할 수 있습니다.')
    .optional(),
});

export type EnrollmentVerificationFormData = z.infer<
  typeof enrollmentVerificationSchema
>;
