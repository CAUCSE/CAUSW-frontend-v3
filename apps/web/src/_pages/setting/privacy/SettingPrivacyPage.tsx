'use client';

import { Text, VStack } from '@causw/cds';

import {
  PrivacyAcademicInfoSection,
  PrivacyActionSection,
  PrivacyBasicInfoSection,
  PrivacyEnrollmentStatusSection,
  PrivacySocialSection,
} from '@/widgets/setting';

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

const SettingPrivacyContent = () => {
  const { data: account } = useMyAccountSuspenseQuery();

  const handleLogout = () => {
    // TODO: 로그아웃 로직 연결
    console.log('로그아웃');
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 로직 연결
    console.log('회원탈퇴');
  };

  const handleChangePhoneNumber = () => {
    // TODO: 전화번호 변경 로직 연결
    console.log('전화번호 변경');
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

      <PrivacySocialSection />

      <PrivacyActionSection
        onLogout={handleLogout}
        onWithdraw={handleWithdraw}
      />
    </VStack>
  );
};
