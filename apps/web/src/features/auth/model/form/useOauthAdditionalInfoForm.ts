'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { infoSchema, type InfoFormData } from '@/entities/auth';

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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    methods.setValue('phoneNumber', formattedValue, { shouldValidate: true });
  };

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
