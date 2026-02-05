'use client';

import { useFunnel } from '@use-funnel/browser';

import { AuthContainer } from '@/widgets/auth';

import { AccountStep } from '../steps/AccountStep';
import { InfoStep } from '../steps/InfoStep';

export type SignUpStep = {
  Account: {
    email?: string;
    password?: string;
  };
  Info: {
    email: string;
    password: string;
    name?: string;
    studentId?: string;
    nickname?: string;
  };
};

export const SignUpFunnel = () => {
  const funnel = useFunnel<SignUpStep>({
    id: 'sign-up',
    initial: {
      step: 'Account',
      context: {},
    },
  });

  return (
    <AuthContainer>
      <funnel.Render
        Account={({ history }) => (
          <AccountStep
            onNext={() => history.push('Info', { email: '', password: '' })}
          />
        )}
        Info={() => (
          <InfoStep
            onNext={() => console.log('Next step not implemented yet')}
          />
        )}
      />
    </AuthContainer>
  );
};
