'use client';

import { FormProvider } from 'react-hook-form';

import { useFunnel } from '@use-funnel/browser';

import { AuthContainer } from '@/widgets/auth';

import {
  SIGN_UP_STEP,
  useSignUpForm,
  useSignUpStepGuard,
} from '@/features/auth';

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
      funnel.history.replace(SIGN_UP_STEP.Account);
    },
  });
  const { methods, handleSubmit } = useSignUpForm();

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
                  funnel.history.push(SIGN_UP_STEP.EmailVerification);
                }}
              />
            )}
            EmailVerification={() => (
              <EmailVerificationStep
                onNext={() => {
                  allowInfoStep();
                  funnel.history.push(SIGN_UP_STEP.Info);
                }}
              />
            )}
            Info={() => (
              <InfoStep onNext={methods.handleSubmit(handleSubmit)} />
            )}
          />
        </FormProvider>
      </AuthContainer>
    </>
  );
};
