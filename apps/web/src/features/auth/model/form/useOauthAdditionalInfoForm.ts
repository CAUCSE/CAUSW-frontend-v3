'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSocialRegistrationMutation } from '@/features/auth';

import {
  OAUTH_ADDITIONAL_INFO_FORM_FIELD,
  infoSchema,
  TERMS_FORM_FIELD,
  termsAgreementSchema,
  type SocialLoginAdditionalInfoRequestDto,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

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

  const isSubmitEnabled = methods.formState.isValid;

  const { handlePhoneNumberChange } =
    usePhoneNumberChangeHandler<SocialLoginAdditionalInfoRequestDto>({
      setValue: methods.setValue,
      fieldName: OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber,
    });

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
    setAgreedTermsIds,
    onSubmit,
  };
};
