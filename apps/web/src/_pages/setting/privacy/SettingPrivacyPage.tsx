'use client';

import { useState } from 'react';

import { Text, VStack } from '@causw/cds';

import { LogoutConfirmModal } from '@/widgets/auth';
import {
  PRIVACY_ACTION_TYPE,
  PhoneNumberChangeNoticeModal,
  PrivacyAcademicInfoSection,
  PrivacyActionSection,
  PrivacyBasicInfoSection,
  PrivacyEnrollmentStatusSection,
  // TODO: SNS 연동 API 준비 후 노출 (첫 배포 제외)
  // PrivacySocialSection,
} from '@/widgets/setting';

import { useLogout } from '@/features/auth';

import {
  ACCOUNT_DEPARTMENT_LABEL,
  useMyAccountSuspenseQuery,
} from '@/entities/user';

import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

export const SettingPrivacyPage = () => {
  return (
    <VStack gap="sm" className="w-full">
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="계정 정보를 불러오지 못했어요.">
        <HydrationSuspense fallback={<SuspenseView />}>
          <SettingPrivacyContent />
        </HydrationSuspense>
      </QueryErrorBoundary>
    </VStack>
  );
};

/*
  TODO: 회원탈퇴 API 준비 후 구현
*/
const SettingPrivacyContent = () => {
  const { data: account } = useMyAccountSuspenseQuery();
  const logout = useLogout();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [phoneNoticeOpen, setPhoneNoticeOpen] = useState(false);

  const handleChangePhoneNumber = () => {
    setPhoneNoticeOpen(true);
  };

  const handleChangeStatus = () => {
    // TODO: 학적 상태 변경 로직 연결
    console.log('학적 상태 변경');
  };

  return (
    <VStack gap="md" className="w-full px-4">
      <Text typography="title-22-bold" textColor="gray-800">
        계정 정보 관리
      </Text>

      <PrivacyBasicInfoSection
        name={account.name}
        email={account.email}
        phoneNumber={account.phoneNumber}
        onChangePhoneNumber={handleChangePhoneNumber}
      />

      <PrivacyAcademicInfoSection
        studentId={account.studentId}
        major={
          account.department
            ? ACCOUNT_DEPARTMENT_LABEL[account.department]
            : '-'
        }
        admissionYear={account.admissionYear}
        graduationYear={account.graduationYear}
      />

      <PrivacyEnrollmentStatusSection
        academicStatus={account.academicStatus}
        onChangeStatus={handleChangeStatus}
      />

      {/* TODO: SNS 연동 API 준비 후 노출 (첫 배포 제외) */}
      {/* <PrivacySocialSection /> */}

      <PrivacyActionSection
        actions={[
          {
            type: PRIVACY_ACTION_TYPE.LOGOUT,
            onClick: () => setLogoutModalOpen(true),
          },
        ]}
      />

      <LogoutConfirmModal
        open={logoutModalOpen}
        onOpenChange={setLogoutModalOpen}
        onConfirm={logout}
      />

      <PhoneNumberChangeNoticeModal
        open={phoneNoticeOpen}
        onOpenChange={setPhoneNoticeOpen}
      />
    </VStack>
  );
};
