'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSocialRegistrationMutation } from '@/features/auth';

import {
  OAUTH_ADDITIONAL_INFO_FORM_FIELD,
  infoSchema,
  type InfoFormData,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

export const useOauthAdditionalInfoForm = () => {
  const socialRegistrationMutation = useSocialRegistrationMutation();
  const methods = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumber: '',
      nickname: '',
    },
  });

  const isSubmitEnabled = methods.formState.isValid;

  const { handlePhoneNumberChange } = usePhoneNumberChangeHandler<InfoFormData>(
    {
      setValue: methods.setValue,
      fieldName: OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber,
    },
  );

  const onSubmit = async (data: InfoFormData) => {
    await socialRegistrationMutation.mutateAsync(data);
  };

  return {
    methods,
    isSubmitEnabled,
    handlePhoneNumberChange,
    onSubmit,
  };
};
