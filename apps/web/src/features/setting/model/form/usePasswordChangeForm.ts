'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';
import {
  passwordChangeFormSchema,
  type PasswordChangeFormData,
} from '@/entities/setting';

import { useChangeMyPasswordMutation } from '../mutations';

export const usePasswordChangeForm = () => {
  const { data: me } = useQuery(authQueryOptions.me());
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
    if (!me?.email) {
      return;
    }

    changePasswordMutation.mutate({
      email: me.email,
      currentPassword: data.currentPassword,
      newPassword: data.nextPassword,
      newPasswordConfirm: data.confirmPassword,
    });
  };

  return {
    methods,
    onSubmit,
    isReady: !!me?.email,
    isSubmitting: changePasswordMutation.isPending,
  };
};
