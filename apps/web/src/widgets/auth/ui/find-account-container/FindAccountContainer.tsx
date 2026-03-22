'use client';

import { useRef, useState } from 'react';

import { Text, VStack, HStack, Tab, LockOpenColored } from '@causw/cds';

import { FindEmailForm, FindPasswordForm } from '@/features/auth';

import type { EmailFindResponse, FindEmailFormData } from '@/entities/auth';

import { FindEmailNotFound } from '../find-email-not-found';
import { FindEmailResult } from '../find-email-result';
import { PasswordEmailSent } from '../password-email-sent';

type FindAccountTab = 'find-email' | 'find-password';

export type FindAccountView =
  | { type: 'form' }
  | { type: 'result'; data: EmailFindResponse; name: string }
  | { type: 'not-found' }
  | { type: 'password-email-sent'; email: string };

// TODO: API 연동 후 제거
const MOCK_RESPONSES: (EmailFindResponse | null)[] = [
  {
    email: 'abc***@cau.ac.kr',
    createdAt: '2020-01-02',
    socialAccounts: [
      { provider: 'KAKAO', createdAt: '2024-01-01' },
      { provider: 'APPLE', createdAt: '2024-05-12' },
      { provider: 'GOOGLE', createdAt: '2024-05-12' },
    ],
  },
  {
    email: 'abc***@cau.ac.kr',
    createdAt: '2020-01-02',
    socialAccounts: [],
  },
  {
    email: '',
    createdAt: '',
    socialAccounts: [{ provider: 'KAKAO', createdAt: '2024-01-01' }],
  },
  null,
];

interface FindAccountContainerProps {
  view: FindAccountView;
  onViewChange: (view: FindAccountView) => void;
}

export const FindAccountContainer = ({
  view,
  onViewChange,
}: FindAccountContainerProps) => {
  const [activeTab, setActiveTab] = useState<FindAccountTab>('find-email');
  const mockIndex = useRef(0);

  const handleBackToForm = () => {
    onViewChange({ type: 'form' });
  };

  const handleFindPassword = () => {
    onViewChange({ type: 'form' });
    setActiveTab('find-password');
  };

  // TODO: API 연동 후 제거
  const handleMockSubmit = (formData: FindEmailFormData) => {
    const response = MOCK_RESPONSES[mockIndex.current % MOCK_RESPONSES.length];
    mockIndex.current++;

    if (response) {
      onViewChange({ type: 'result', data: response, name: formData.name });
    } else {
      onViewChange({ type: 'not-found' });
    }
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

            <FindEmailForm onSubmit={handleMockSubmit} />
          </>
        )}

        {activeTab === 'find-password' && (
          <FindPasswordForm
            onSubmit={(email) =>
              onViewChange({ type: 'password-email-sent', email })
            }
          />
        )}
      </VStack>
    </Tab>
  );
};
