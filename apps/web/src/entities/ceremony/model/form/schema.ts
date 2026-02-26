import { z } from 'zod';

export const ceremonyFormSchema = z
  .object({
    ceremonyType: z.enum(['경사', '조사', '']),
    category: z.string(),
    customCategory: z.string(),

    relationship: z.enum(['본인', '가족', '동문소식 대신 전달', '']),
    familyRelation: z.string(),
    alumniName: z.string(),
    alumniAdmissionYear: z.string(),
    alumniRelation: z.string(),

    startDate: z.date().optional(),
    endDate: z.date().optional(),
    startTime: z.string(),
    endTime: z.string(),
    hasEndDate: z.boolean(),
    hasTime: z.boolean(),

    notifyAll: z.boolean(),
    admissionYears: z.array(z.string()),

    content: z.string(),
    postalCode: z.string(),
    address: z.string(),
    detailAddress: z.string(),
    phone: z.string(),
    relatedLink: z.string(),
  })
  .superRefine((data, ctx) => {
    // ceremonyType 필수
    if (data.ceremonyType === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '분류를 선택해주세요.',
        path: ['ceremonyType'],
      });
    }

    // category 필수 (custom일 때 customCategory 확인)
    if (data.category === 'custom') {
      if (data.customCategory.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상세 분류를 입력해주세요.',
          path: ['customCategory'],
        });
      }
    } else if (data.category === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '상세 분류를 선택해주세요.',
        path: ['category'],
      });
    }

    // startDate 필수
    if (!data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '시작일을 선택해주세요.',
        path: ['startDate'],
      });
    }

    // 관계 조건부 필수
    if (data.relationship === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '관계를 선택해주세요.',
        path: ['relationship'],
      });
    } else if (data.relationship === '가족' && data.familyRelation === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '상세 관계를 선택해주세요.',
        path: ['familyRelation'],
      });
    } else if (data.relationship === '동문소식 대신 전달') {
      if (data.alumniName.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '대상 성함을 입력해주세요.',
          path: ['alumniName'],
        });
      }
      if (data.alumniAdmissionYear.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '동문 학번을 입력해주세요.',
          path: ['alumniAdmissionYear'],
        });
      }
      if (data.alumniRelation === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '대상과의 관계를 선택해주세요.',
          path: ['alumniRelation'],
        });
      }
    }

    // 학번 알림 조건부 필수
    if (!data.notifyAll && data.admissionYears.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '알림 보낼 학번을 추가해주세요.',
        path: ['admissionYears'],
      });
    }
  });

export type CeremonyFormData = z.infer<typeof ceremonyFormSchema>;

export const CEREMONY_FORM_DEFAULT_VALUES: CeremonyFormData = {
  ceremonyType: '',
  category: '',
  customCategory: '',
  relationship: '',
  familyRelation: '',
  alumniName: '',
  alumniAdmissionYear: '',
  alumniRelation: '',
  startDate: undefined,
  endDate: undefined,
  startTime: '',
  endTime: '',
  hasEndDate: false,
  hasTime: false,
  notifyAll: false,
  admissionYears: [],
  content: '',
  postalCode: '',
  address: '',
  detailAddress: '',
  phone: '',
  relatedLink: '',
};
