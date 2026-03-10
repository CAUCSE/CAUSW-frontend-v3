'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { ApiError } from '@causw/api-client';

import {
  useCheckNicknameDuplicateQuery,
  useCheckPhoneDuplicateQuery,
} from '@/features/auth';

import { infoSchema, type SignUpFormData } from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

const UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE =
  '중복 확인 중 알 수 없는 오류가 발생했습니다.';

const PHONE_DUPLICATED_MESSAGE = '이미 사용 중인 전화번호입니다.';
const NICKNAME_DUPLICATED_MESSAGE = '이미 사용 중인 닉네임입니다.';

export const useSignUpInfoStep = () => {
  const { control, setValue, trigger, setError, clearErrors, formState } =
    useFormContext<SignUpFormData>();
  const [name = '', phoneNumber = '', nickname = ''] = useWatch({
    control,
    name: ['name', 'phoneNumber', 'nickname'],
  });
  const checkPhoneDuplicateQuery = useCheckPhoneDuplicateQuery(phoneNumber);
  const checkNicknameDuplicateQuery = useCheckNicknameDuplicateQuery(nickname);

  const isInfoValid = infoSchema.safeParse({
    name,
    phoneNumber,
    nickname,
  }).success;

  const hasDuplicateError =
    !!formState.errors.phoneNumber || !!formState.errors.nickname;

  const isNextEnabled =
    isInfoValid &&
    !hasDuplicateError &&
    !checkPhoneDuplicateQuery.isFetching &&
    !checkNicknameDuplicateQuery.isFetching;
  const { handlePhoneNumberChange } =
    usePhoneNumberChangeHandler<SignUpFormData>({
      setValue,
      fieldName: 'phoneNumber',
    });

  const handlePhoneNumberBlur = () => {
    trigger('phoneNumber').then((isValid) => {
      if (!isValid) return;

      checkPhoneDuplicateQuery.refetch().then((result) => {
        if (!result.error) {
          clearErrors('phoneNumber');
          return;
        }

        if (result.error instanceof ApiError && result.error.status === 409) {
          setError('phoneNumber', {
            type: 'manual',
            message: PHONE_DUPLICATED_MESSAGE,
          });
          return;
        }

        setError('phoneNumber', {
          type: 'manual',
          message: UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE,
        });
      });
    });
  };

  const handleNicknameBlur = () => {
    trigger('nickname').then((isValid) => {
      if (!isValid) return;

      checkNicknameDuplicateQuery.refetch().then((result) => {
        if (!result.error) {
          clearErrors('nickname');
          return;
        }

        if (result.error instanceof ApiError && result.error.status === 409) {
          setError('nickname', {
            type: 'manual',
            message: NICKNAME_DUPLICATED_MESSAGE,
          });
          return;
        }

        setError('nickname', {
          type: 'manual',
          message: UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE,
        });
      });
    });
  };

  return {
    isNextEnabled,
    handlePhoneNumberChange,
    handlePhoneNumberBlur,
    handleNicknameBlur,
  };
};
