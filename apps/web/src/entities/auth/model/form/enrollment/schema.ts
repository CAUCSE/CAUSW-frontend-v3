import { z } from 'zod';

const MIN_ENROLLMENT_YEAR = 1950;
const MAX_ENROLLMENT_YEAR = new Date().getFullYear();

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

export const enrollmentVerificationSchema = z.object({
  major: z.string().min(1, '학과를 선택해주세요.'),
  enrollmentYear: yearSchema('입학년도'),
  graduationYear: yearSchema('졸업년도'),
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
    .array(z.instanceof(File))
    .max(3, '이미지는 최대 3장까지 첨부할 수 있습니다.')
    .optional(),
});

export type EnrollmentVerificationFormData = z.infer<
  typeof enrollmentVerificationSchema
>;
