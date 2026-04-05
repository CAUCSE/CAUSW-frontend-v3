'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  OAUTH_ADDITIONAL_INFO_FORM_FIELD,
  infoSchema,
  type InfoFormData,
} from '@/entities/auth';

import { usePhoneNumberChangeHandler } from '@/shared/hooks';

export const useOauthAdditionalInfoForm = () => {
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

  const onSubmit = (data: InfoFormData) => {
    console.log('Oauth Additional Info Data:', data);
  };

  return {
    methods,
    isSubmitEnabled,
    handlePhoneNumberChange,
    onSubmit,
  };
};
