'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { infoSchema, type InfoFormData } from '@/entities/auth';

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

  const [name = '', phoneNumber = '', nickname = ''] = useWatch({
    control: methods.control,
    name: ['name', 'phoneNumber', 'nickname'],
  });

  const isSubmitEnabled = infoSchema.safeParse({
    name,
    phoneNumber,
    nickname,
  }).success;
  const { handlePhoneNumberChange } = usePhoneNumberChangeHandler<InfoFormData>(
    {
      setValue: methods.setValue,
      fieldName: 'phoneNumber',
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
