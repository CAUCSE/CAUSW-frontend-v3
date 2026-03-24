import { z } from 'zod';

import {
  MAX_NICKNAME_LENGTH,
  MIN_NICKNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@/shared/constants';

export const emailSchema = z.string().email('올바른 이메일 형식이 아닙니다.');

export const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
  );

export const nameSchema = z.string().min(1, '이름을 입력해주세요.');

export const phoneNumberSchema = z
  .string()
  .min(11, '올바른 전화번호 형식이 아닙니다.')
  .max(13, '올바른 전화번호 형식이 아닙니다.')
  .regex(/^010-\d{4}-\d{4}$/, '010-XXXX-XXXX 형식이어야 합니다.');

export const nicknameSchema = z
  .string()
  .min(
    MIN_NICKNAME_LENGTH,
    `닉네임은 ${MIN_NICKNAME_LENGTH}자 이상이어야 합니다.`,
  )
  .max(
    MAX_NICKNAME_LENGTH,
    `닉네임은 ${MAX_NICKNAME_LENGTH}자 이하여야 합니다.`,
  )
  .regex(/^[가-힣a-zA-Z0-9_]+$/, '한글, 영문, 숫자, _만 사용할 수 있습니다.');
