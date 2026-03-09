'use client';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@use-funnel/browser';

import { AuthContainer } from '@/widgets/auth';

import { useSignUpStepGuard } from '@/features/auth/model/guard';

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
  const { allowEmailVerificationStep, allowInfoStep } = useSignUpStepGuard({
    initialStep,
  });

  const funnel = useFunnel<SignUpStep>({
    id: 'sign-up',
    initial: {
      step: initialStep,
      context: {},
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
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log('Final Submission:', data);
    // Submit logic here
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
            Account={({ history }) => (
              <AccountStep
                onNext={async () => {
                  const isValid = await methods.trigger([
                    'email',
                    'password',
                    'passwordConfirm',
                  ]);
                  if (!isValid) return;

                  allowEmailVerificationStep();
                  history.push('EmailVerification');
                }}
              />
            )}
            EmailVerification={({ history }) => (
              <EmailVerificationStep
                onNext={() => {
                  allowInfoStep();
                  history.push('Info');
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
