'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { ApiError } from '@causw/api-client';

import {
  useCheckNicknameDuplicateQuery,
  useCheckPhoneDuplicateQuery,
  useSocialRegistrationMutation,
} from '@/features/auth';

import {
  OAUTH_ADDITIONAL_INFO_FORM_FIELD,
  infoSchema,
  TERMS_FORM_FIELD,
  termsAgreementSchema,
  type SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

const UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE =
  '중복 확인 중 알 수 없는 오류가 발생했습니다.';

const PHONE_DUPLICATED_MESSAGE = '이미 사용 중인 전화번호입니다.';
const NICKNAME_DUPLICATED_MESSAGE = '이미 사용 중인 닉네임입니다.';
const DUPLICATE_CHECK_CONFLICT_STATUS = 409;

export const useOauthAdditionalInfoForm = () => {
  const socialRegistrationMutation = useSocialRegistrationMutation();
  const methods = useForm<SocialLoginAdditionalInfoRequestDto>({
    resolver: zodResolver(infoSchema.and(termsAgreementSchema)),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumber: '',
      nickname: '',
      agreedTermsIds: [],
    },
  });

  const [name = '', phoneNumber = '', nickname = ''] = useWatch({
    control: methods.control,
    name: Object.values(OAUTH_ADDITIONAL_INFO_FORM_FIELD),
  });
  const checkPhoneDuplicateQuery = useCheckPhoneDuplicateQuery(phoneNumber);
  const checkNicknameDuplicateQuery = useCheckNicknameDuplicateQuery(nickname);

  const isInfoValid = infoSchema.safeParse({
    name,
    phoneNumber,
    nickname,
  }).success;

  const hasDuplicateError =
    !!methods.formState.errors[OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber] ||
    !!methods.formState.errors[OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname];

  const isSubmitEnabled =
    isInfoValid &&
    !hasDuplicateError &&
    !checkPhoneDuplicateQuery.isFetching &&
    !checkNicknameDuplicateQuery.isFetching;

  const { handlePhoneNumberChange } =
    usePhoneNumberChangeHandler<SocialLoginAdditionalInfoRequestDto>({
      setValue: methods.setValue,
      fieldName: OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber,
    });

  const handlePhoneNumberBlur = () => {
    methods
      .trigger(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber)
      .then((isValid) => {
        if (!isValid) return;

        checkPhoneDuplicateQuery.refetch().then((result) => {
          if (!result.error) {
            methods.clearErrors(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber);
            return;
          }

          if (
            result.error instanceof ApiError &&
            result.error.status === DUPLICATE_CHECK_CONFLICT_STATUS
          ) {
            methods.setError(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber, {
              type: 'manual',
              message: PHONE_DUPLICATED_MESSAGE,
            });
            return;
          }

          methods.setError(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber, {
            type: 'manual',
            message: UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE,
          });
        });
      });
  };

  const handleNicknameBlur = () => {
    methods
      .trigger(OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname)
      .then((isValid) => {
        if (!isValid) return;

        checkNicknameDuplicateQuery.refetch().then((result) => {
          if (!result.error) {
            methods.clearErrors(OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname);
            return;
          }

          if (
            result.error instanceof ApiError &&
            result.error.status === DUPLICATE_CHECK_CONFLICT_STATUS
          ) {
            methods.setError(OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname, {
              type: 'manual',
              message: NICKNAME_DUPLICATED_MESSAGE,
            });
            return;
          }

          methods.setError(OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname, {
            type: 'manual',
            message: UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE,
          });
        });
      });
  };

  const setAgreedTermsIds = (agreedTermsIds: string[]) => {
    methods.setValue(TERMS_FORM_FIELD.agreedTermsIds, agreedTermsIds, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: SocialLoginAdditionalInfoRequestDto) => {
    await socialRegistrationMutation.mutateAsync(data);
  };

  return {
    methods,
    isSubmitEnabled,
    handlePhoneNumberChange,
    handlePhoneNumberBlur,
    handleNicknameBlur,
    setAgreedTermsIds,
    onSubmit,
  };
};
