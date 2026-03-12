'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@use-funnel/browser';

import { AuthContainer } from '@/widgets/auth';

import { useSignUpMutation, useSignUpStepGuard } from '@/features/auth';

import { signUpSchema, type SignUpFormData } from '@/entities/auth';

import { ActionHeader, DesktopOnly, MobileOnly } from '@/shared/ui';

import { AccountStep } from '../steps/AccountStep';
import { EmailVerificationStep } from '../steps/EmailVerificationStep';
import { InfoStep } from '../steps/InfoStep';

export type SignUpStep = {
  Account: Record<string, never>; // Empty context for now
  EmailVerification: Record<string, never>;
  Info: Record<string, never>;
};

type SignUpFunnelProps = {
  initialStep: keyof SignUpStep;
};

export const SignUpFunnel = ({ initialStep }: SignUpFunnelProps) => {
  const router = useRouter();
  const funnel = useFunnel<SignUpStep>({
    id: 'sign-up',
    initial: {
      step: initialStep,
      context: {},
    },
  });
  const { allowEmailVerificationStep, allowInfoStep } = useSignUpStepGuard({
    initialStep,
    onResetToAccount: () => {
      funnel.history.replace('Account');
    },
  });
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
    },
  });
  const signUpMutation = useSignUpMutation();

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        nickname: data.nickname,
        emailVerificationCode: data.emailVerificationCode,
      },
      {
        onSuccess: () => {
          router.replace('/auth/enrollment-verification');
        },
      },
    );
  };

  return (
    <>
      <MobileOnly>
        <ActionHeader>
          <ActionHeader.BackButton onClick={() => funnel.history.back()}>
            뒤로
          </ActionHeader.BackButton>
        </ActionHeader>
      </MobileOnly>
      <AuthContainer>
        <DesktopOnly>
          <ActionHeader className="mb-10 px-0">
            <ActionHeader.BackButton onClick={() => funnel.history.back()}>
              뒤로
            </ActionHeader.BackButton>
          </ActionHeader>
        </DesktopOnly>
        <FormProvider {...methods}>
          <funnel.Render
            Account={() => (
              <AccountStep
                onNext={() => {
                  allowEmailVerificationStep();
                  funnel.history.push('EmailVerification');
                }}
              />
            )}
            EmailVerification={() => (
              <EmailVerificationStep
                onNext={() => {
                  allowInfoStep();
                  funnel.history.push('Info');
                }}
              />
            )}
            Info={() => <InfoStep onNext={methods.handleSubmit(onSubmit)} />}
          />
        </FormProvider>
      </AuthContainer>
    </>
  );
};
