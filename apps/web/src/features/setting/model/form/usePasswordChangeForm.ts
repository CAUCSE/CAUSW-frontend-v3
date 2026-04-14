'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  passwordChangeFormSchema,
  type PasswordChangeFormData,
} from '@/entities/setting';

import { useChangeMyPasswordMutation } from '../mutations';

export const usePasswordChangeForm = () => {
  const methods = useForm<PasswordChangeFormData>({
    mode: 'onChange',
    resolver: zodResolver(passwordChangeFormSchema),
    defaultValues: {
      currentPassword: '',
      nextPassword: '',
      confirmPassword: '',
    },
  });
  const changePasswordMutation = useChangeMyPasswordMutation({
    onSuccess: () => {
      methods.reset();
    },
  });

  const onSubmit = (data: PasswordChangeFormData) => {
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.nextPassword,
      newPasswordConfirm: data.confirmPassword,
    });
  };

  return {
    methods,
    onSubmit,
    isSubmitting: changePasswordMutation.isPending,
  };
};
