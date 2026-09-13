'use client';

import { useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { ApiError } from '@causw/api-client';

import {
  useCheckNicknameDuplicateQuery,
  useCheckPhoneDuplicateQuery,
  useExistingAccountLookupMutation,
  useSocialRegistrationMutation,
} from '@/features/auth';

import {
  hasFindEmailResult,
  infoSchema,
  normalizeFindEmailRequest,
  OAUTH_ADDITIONAL_INFO_FORM_FIELD,
  TERMS_FORM_FIELD,
  termsAgreementSchema,
  type EmailFindResponse,
  type SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';
import { nameSchema } from '@/shared/model';

const UNKNOWN_DUPLICATE_CHECK_ERROR_MESSAGE =
  '중복 확인 중 알 수 없는 오류가 발생했습니다.';

const PHONE_DUPLICATED_MESSAGE = '이미 가입된 전화번호입니다.';
const NICKNAME_DUPLICATED_MESSAGE = '이미 사용 중인 닉네임입니다.';
const DUPLICATE_CHECK_CONFLICT_STATUS = 409;

// 조회 시점의 이름/전화번호를 함께 보관해 입력이 바뀌면 결과를 무효화한다.
interface ExistingAccountCheck {
  name: string;
  phoneNumber: string;
  account: EmailFindResponse;
}

export const useOauthAdditionalInfoForm = () => {
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
  const existingAccountLookupMutation = useExistingAccountLookupMutation();

  const [existingAccountCheck, setExistingAccountCheck] =
    useState<ExistingAccountCheck | null>(null);
  const [isAccountLinkGuideDialogOpen, setIsAccountLinkGuideDialogOpen] =
    useState(false);

  const existingAccount =
    existingAccountCheck &&
    existingAccountCheck.name === name &&
    existingAccountCheck.phoneNumber === phoneNumber
      ? existingAccountCheck.account
      : null;

  const isPhoneNumberFieldEnabled = nameSchema.safeParse(name).success;

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

  const lookupExistingAccount = async (
    currentName: string,
    currentPhoneNumber: string,
  ) => {
    methods.setError(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber, {
      type: 'manual',
      message: PHONE_DUPLICATED_MESSAGE,
    });

    // 감지당 1회: 같은 이름/전화번호 조합은 재조회하거나 다이얼로그를 재노출하지 않는다.
    if (
      existingAccountCheck &&
      existingAccountCheck.name === currentName &&
      existingAccountCheck.phoneNumber === currentPhoneNumber
    ) {
      return;
    }

    try {
      const account = await existingAccountLookupMutation.mutateAsync(
        normalizeFindEmailRequest({
          name: currentName,
          phoneNumber: currentPhoneNumber,
        }),
      );

      if (hasFindEmailResult(account)) {
        setExistingAccountCheck({
          name: currentName,
          phoneNumber: currentPhoneNumber,
          account,
        });
        setIsAccountLinkGuideDialogOpen(true);
      }
    } catch {
      // 교차 검증에 실패해도 전화번호 중복 에러 안내는 유지한다.
    }
  };

  const socialRegistrationMutation = useSocialRegistrationMutation({
    onPhoneDuplicated: () => void lookupExistingAccount(name, phoneNumber),
  });

  const { handlePhoneNumberChange } =
    usePhoneNumberChangeHandler<SocialLoginAdditionalInfoRequestDto>({
      setValue: methods.setValue,
      fieldName: OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber,
    });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nameSchema.safeParse(event.target.value).success) return;

    // 이름이 완전히 무효화된 경우에만 전화번호 입력과 감지 결과를 초기화한다.
    methods.setValue(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber, '');
    methods.clearErrors(OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber);
    setExistingAccountCheck(null);
    setIsAccountLinkGuideDialogOpen(false);
  };

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
            void lookupExistingAccount(name, phoneNumber);
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

  const openAccountLinkGuideDialog = () => {
    setIsAccountLinkGuideDialogOpen(true);
  };

  const closeAccountLinkGuideDialog = () => {
    setIsAccountLinkGuideDialogOpen(false);
  };

  const setAgreedTermsIds = (agreedTermsIds: string[]) => {
    methods.setValue(TERMS_FORM_FIELD.agreedTermsIds, agreedTermsIds, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: SocialLoginAdditionalInfoRequestDto) => {
    await socialRegistrationMutation.mutateAsync(data).catch(() => {});
  };

  return {
    methods,
    isSubmitEnabled,
    isPhoneNumberFieldEnabled,
    existingAccount,
    isAccountLinkGuideDialogOpen,
    openAccountLinkGuideDialog,
    closeAccountLinkGuideDialog,
    handleNameChange,
    handlePhoneNumberChange,
    handlePhoneNumberBlur,
    handleNicknameBlur,
    setAgreedTermsIds,
    onSubmit,
  };
};
