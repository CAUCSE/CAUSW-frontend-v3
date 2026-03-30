'use client';

import { useState } from 'react';

import { ApiError } from '@causw/api-client';
import { Text, VStack, HStack, Tab, LockOpenColored } from '@causw/cds';

import {
  FindEmailForm,
  FindPasswordForm,
  useFindEmailMutation,
  useSendPasswordResetCodeMutation,
  useVerifyPasswordResetCodeMutation,
} from '@/features/auth';

import type { EmailFindResponse, FindEmailFormData } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

import { FindEmailNotFound } from '../find-email-not-found';
import { FindEmailResult } from '../find-email-result';
import { PasswordEmailSent } from '../password-email-sent';

type FindAccountTab = 'find-email' | 'find-password';

export type FindAccountView =
  | { type: 'form' }
  | { type: 'result'; data: EmailFindResponse; name: string }
  | { type: 'not-found' }
  | { type: 'password-email-sent'; email: string };

interface FindAccountContainerProps {
  view: FindAccountView;
  onViewChange: (view: FindAccountView) => void;
}

export const FindAccountContainer = ({
  view,
  onViewChange,
}: FindAccountContainerProps) => {
  const [activeTab, setActiveTab] = useState<FindAccountTab>('find-email');

  const findEmailMutation = useFindEmailMutation();
  const sendResetCodeMutation = useSendPasswordResetCodeMutation();
  const verifyResetCodeMutation = useVerifyPasswordResetCodeMutation();

  const handleBackToForm = () => {
    onViewChange({ type: 'form' });
  };

  const handleFindPassword = () => {
    onViewChange({ type: 'form' });
    setActiveTab('find-password');
  };

  const handleFindEmail = (formData: FindEmailFormData) => {
    findEmailMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success('계정 정보를 찾았습니다.');
        onViewChange({ type: 'result', data, name: formData.name });
      },
      onError: (error) => {
        if (error instanceof ApiError && error.status && error.status < 500) {
          onViewChange({ type: 'not-found' });
        } else {
          toast.error(
            extractErrorMessage(
              error,
              '계정 정보 조회에 실패했습니다. 다시 시도해 주세요.',
            ),
          );
        }
      },
    });
  };

  if (view.type === 'result') {
    return (
      <FindEmailResult
        data={view.data}
        name={view.name}
        onFindPassword={handleFindPassword}
      />
    );
  }

  if (view.type === 'not-found') {
    return <FindEmailNotFound onRetry={handleBackToForm} />;
  }

  if (view.type === 'password-email-sent') {
    return <PasswordEmailSent email={view.email} />;
  }

  return (
    <Tab
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as FindAccountTab)}
    >
      <VStack className="w-full gap-6">
        <VStack className="w-full gap-4">
          <Text as="h1" typography="title-22-bold" textColor="gray-800">
            이메일 / 비밀번호 찾기
          </Text>

          <Tab.List className="gap-0 rounded-[0.75rem] bg-white p-1">
            <Tab.TabItem
              value="find-email"
              className="flex-1 justify-center rounded-[0.5rem] border-0 bg-transparent py-2 aria-selected:bg-gray-100"
            >
              <Text
                typography="body-15-semibold"
                textColor={activeTab === 'find-email' ? 'gray-800' : 'gray-500'}
              >
                이메일 찾기
              </Text>
            </Tab.TabItem>
            <Tab.TabItem
              value="find-password"
              className="flex-1 justify-center rounded-[0.5rem] border-0 bg-transparent py-2 aria-selected:bg-gray-100"
            >
              <Text
                typography="body-15-semibold"
                textColor={
                  activeTab === 'find-password' ? 'gray-800' : 'gray-500'
                }
              >
                비밀번호 찾기
              </Text>
            </Tab.TabItem>
          </Tab.List>
        </VStack>

        {activeTab === 'find-email' && (
          <>
            <HStack className="items-center gap-3 rounded-[1rem] bg-white px-4 py-4">
              <LockOpenColored size={24} className="shrink-0" />
              <Text typography="body-14-regular" textColor="gray-600">
                가입 시 입력한 정보로 계정을 확인할 수 있어요.
              </Text>
            </HStack>

            <FindEmailForm onSubmit={handleFindEmail} />
          </>
        )}

        {activeTab === 'find-password' && (
          <FindPasswordForm
            onSendCode={async ({ name, email }) => {
              await sendResetCodeMutation.mutateAsync({ name, email });
            }}
            onVerifyCode={async (data) => {
              await verifyResetCodeMutation.mutateAsync(data);
              onViewChange({ type: 'password-email-sent', email: data.email });
            }}
          />
        )}
      </VStack>
    </Tab>
  );
};
