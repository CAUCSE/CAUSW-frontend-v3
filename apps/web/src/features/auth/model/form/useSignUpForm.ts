'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSignUpMutation } from '@/features/auth';

import { signUpSchema, type SignUpFormData } from '@/entities/auth';

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
        onSuccess: () => {
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
