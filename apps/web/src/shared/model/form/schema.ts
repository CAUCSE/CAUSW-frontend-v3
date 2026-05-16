import { z } from 'zod';

import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/shared/constants';

export const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
    '올바른 이메일 형식이 아닙니다.',
  );

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-?_])[A-Za-z0-9!@#$%^&*()\-?_]{8,20}$/,
    '비밀번호는 8~20자이며 영문, 숫자, 특수문자를 포함해야 합니다.',
  );

export const nameSchema = z.string().min(1, '이름을 입력해주세요.');

export const phoneNumberSchema = z
  .string()
  .min(11, '올바른 전화번호 형식이 아닙니다.')
  .max(13, '올바른 전화번호 형식이 아닙니다.')
  .regex(
    /^01(?:0|1|[6-9])-(\d{3}|\d{4})-\d{4}$/,
    '올바른 연락처 형식이 아닙니다.',
  );

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
  .regex(
    /^[가-힣a-zA-Z0-9]{2,8}$/,
    '닉네임은 공백 제외 2~8자의 한글, 영문, 숫자만 사용할 수 있습니다.',
  );
