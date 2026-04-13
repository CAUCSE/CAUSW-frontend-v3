import { z } from 'zod';

import { isValidTimeFormat, isEndDateTimeBeforeStart } from '@/shared/lib';
import { phoneNumberSchema } from '@/shared/model/form';

import { CUSTOM_VALUE } from '../../config';

export const ceremonyFormSchema = z
  .object({
    ceremonyType: z.enum(['경사', '조사', '']),
    category: z.string(),
    customCategory: z.string(),

    relationship: z.enum(['본인', '가족', '동문소식 대신 전달', '']),
    familyRelation: z.string(),
    customFamilyRelation: z.string(),
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
    phone: z.union([z.literal(''), phoneNumberSchema]),
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
    if (data.category === CUSTOM_VALUE) {
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

    // 시간 형식 검증
    if (
      data.hasTime &&
      data.startTime !== '' &&
      !isValidTimeFormat(data.startTime)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바른 시간 형식이 아닙니다. (00:00 ~ 23:59)',
        path: ['startTime'],
      });
    }
    if (
      data.hasTime &&
      data.endTime !== '' &&
      !isValidTimeFormat(data.endTime)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바른 시간 형식이 아닙니다. (00:00 ~ 23:59)',
        path: ['endTime'],
      });
    }

    // 종료일시가 시작일시보다 이전인지 검사 (날짜+시간 결합)
    if (data.hasEndDate && data.startDate && data.endDate) {
      const startTime = data.hasTime ? data.startTime : undefined;
      const endTime = data.hasTime ? data.endTime : undefined;

      if (
        isEndDateTimeBeforeStart(
          data.startDate,
          data.endDate,
          startTime,
          endTime,
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '종료일은 시작일 이후여야 합니다.',
          path: ['endDate'],
        });
      }
    }

    // 관계 조건부 필수
    if (data.relationship === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '관계를 선택해주세요.',
        path: ['relationship'],
      });
    } else if (data.relationship === '가족') {
      if (data.familyRelation === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상세 관계를 선택해주세요.',
          path: ['familyRelation'],
        });
      } else if (
        data.familyRelation === CUSTOM_VALUE &&
        data.customFamilyRelation.trim() === ''
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '상세 관계를 입력해주세요.',
          path: ['customFamilyRelation'],
        });
      }
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
  customFamilyRelation: '',
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
