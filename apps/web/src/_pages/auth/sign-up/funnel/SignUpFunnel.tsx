import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@use-funnel/browser';

import { AuthContainer } from '@/widgets/auth';

import { signUpSchema, type SignUpFormData } from '@/entities/auth';

import { AccountStep } from '../steps/AccountStep';
import { InfoStep } from '../steps/InfoStep';

export type SignUpStep = {
  Account: Record<string, never>; // Empty context for now
  Info: Record<string, never>;
};

export const SignUpFunnel = () => {
  const funnel = useFunnel<SignUpStep>({
    id: 'sign-up',
    initial: {
      step: 'Account',
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
    <AuthContainer>
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
                if (isValid) history.push('Info');
              }}
            />
          )}
          Info={() => <InfoStep onNext={methods.handleSubmit(onSubmit)} />}
        />
      </FormProvider>
    </AuthContainer>
  );
};
