'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSignUpMutation } from '@/features/auth';

import { signUpSchema, type SignUpFormData } from '@/entities/auth';

import { trackMixpanelEvent } from '@/shared/lib/analytics';
import { TokenManager } from '@/shared/storage';

export const useSignUpForm = () => {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phoneNumber: '',
      nickname: '',
      emailVerificationCode: '',
      agreedTermsIds: [],
    },
  });

  const handleSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        nickname: data.nickname,
        emailVerificationCode: data.emailVerificationCode,
        agreedTermsIds: data.agreedTermsIds,
      },
      {
        onSuccess: async (response) => {
          await TokenManager.setAccessToken(response.accessToken);
          await TokenManager.setRefreshToken(response.refreshToken);
          trackMixpanelEvent({ name: 'profile_info_completed' });
          router.replace('/auth/enrollment-verification');
        },
      },
    );
  };

  return {
    methods,
    handleSubmit,
    isSubmitting: signUpMutation.isPending,
  };
};
