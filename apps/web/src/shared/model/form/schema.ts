import { z } from 'zod';

export const emailSchema = z.string().email('올바른 이메일 형식이 아닙니다.');

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다.');

export const nameSchema = z.string().min(1, '이름을 입력해주세요.');

export const phoneNumberSchema = z
  .string()
  .min(11, '올바른 전화번호 형식이 아닙니다.')
  .max(13, '올바른 전화번호 형식이 아닙니다.')
  .regex(/^010-\d{4}-\d{4}$/, '010-XXXX-XXXX 형식이어야 합니다.');

export const nicknameSchema = z.string().min(1, '닉네임을 입력해주세요.');
