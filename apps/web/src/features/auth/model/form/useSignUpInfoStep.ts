'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { ApiError } from '@causw/api-client';

import {
  useCheckNicknameDuplicateQuery,
  useCheckPhoneDuplicateQuery,
} from '@/features/auth';

import {
  INFO_FORM_FIELD,
  infoSchema,
  type SignUpFormData,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

const UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE =
  '중복 확인 중 알 수 없는 오류가 발생했습니다.';

const PHONE_DUPLICATED_MESSAGE = '이미 사용 중인 전화번호입니다.';
const NICKNAME_DUPLICATED_MESSAGE = '이미 사용 중인 닉네임입니다.';
const DUPLICATE_CHECK_CONFLICT_STATUS = 409;

export const useSignUpInfoStep = () => {
  const { control, setValue, trigger, setError, clearErrors, formState } =
    useFormContext<SignUpFormData>();
  const [name = '', phoneNumber = '', nickname = ''] = useWatch({
    control,
    name: Object.values(INFO_FORM_FIELD),
  });
  const checkPhoneDuplicateQuery = useCheckPhoneDuplicateQuery(phoneNumber);
  const checkNicknameDuplicateQuery = useCheckNicknameDuplicateQuery(nickname);

  const isInfoValid = infoSchema.safeParse({
    name,
    phoneNumber,
    nickname,
  }).success;

  const hasDuplicateError =
    !!formState.errors[INFO_FORM_FIELD.phoneNumber] ||
    !!formState.errors[INFO_FORM_FIELD.nickname];

  const isNextEnabled =
    isInfoValid &&
    !hasDuplicateError &&
    !checkPhoneDuplicateQuery.isFetching &&
    !checkNicknameDuplicateQuery.isFetching;
  const { handlePhoneNumberChange } =
    usePhoneNumberChangeHandler<SignUpFormData>({
      setValue,
      fieldName: INFO_FORM_FIELD.phoneNumber,
    });

  const handlePhoneNumberBlur = () => {
    trigger(INFO_FORM_FIELD.phoneNumber).then((isValid) => {
      if (!isValid) return;

      checkPhoneDuplicateQuery.refetch().then((result) => {
        if (!result.error) {
          clearErrors(INFO_FORM_FIELD.phoneNumber);
          return;
        }

        if (
          result.error instanceof ApiError &&
          result.error.status === DUPLICATE_CHECK_CONFLICT_STATUS
        ) {
          setError(INFO_FORM_FIELD.phoneNumber, {
            type: 'manual',
            message: PHONE_DUPLICATED_MESSAGE,
          });
          return;
        }

        setError(INFO_FORM_FIELD.phoneNumber, {
          type: 'manual',
          message: UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE,
        });
      });
    });
  };

  const handleNicknameBlur = () => {
    trigger(INFO_FORM_FIELD.nickname).then((isValid) => {
      if (!isValid) return;

      checkNicknameDuplicateQuery.refetch().then((result) => {
        if (!result.error) {
          clearErrors(INFO_FORM_FIELD.nickname);
          return;
        }

        if (
          result.error instanceof ApiError &&
          result.error.status === DUPLICATE_CHECK_CONFLICT_STATUS
        ) {
          setError(INFO_FORM_FIELD.nickname, {
            type: 'manual',
            message: NICKNAME_DUPLICATED_MESSAGE,
          });
          return;
        }

        setError(INFO_FORM_FIELD.nickname, {
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
