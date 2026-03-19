'use client';

import { useState } from 'react';

import { Text, VStack, HStack, Tab, LockOpenColored } from '@causw/cds';

import { FindEmailForm } from '@/features/auth';

type FindAccountTab = 'find-email' | 'find-password';

export const FindAccountContainer = () => {
  const [activeTab, setActiveTab] = useState<FindAccountTab>('find-email');

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

            <FindEmailForm />
          </>
        )}

        {activeTab === 'find-password' && null}
      </VStack>
    </Tab>
  );
};
