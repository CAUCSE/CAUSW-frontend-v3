'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import { LogoutConfirmModal, WithdrawConfirmModal } from '@/widgets/auth';
import {
  PRIVACY_ACTION_TYPE,
  PhoneNumberChangeNoticeModal,
  PrivacyAcademicInfoSection,
  PrivacyActionSection,
  PrivacyBasicInfoSection,
  PrivacyEnrollmentStatusSection,
  PrivacySocialSection,
} from '@/widgets/setting';

import { resetAuthAndRouteToSignIn, useLogout } from '@/features/auth';
import { useWithdrawMeMutation } from '@/features/setting';

import {
  ACCOUNT_DEPARTMENT_LABEL,
  useMyAccountSuspenseQuery,
} from '@/entities/user';

import { removeNativeFCM } from '@/shared/storage/fcm/fcm-storage.mobile';
import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';
import { isMobile } from '@/shared/utils';

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
  const router = useRouter();
  const { data: account } = useMyAccountSuspenseQuery();
  const logout = useLogout();
  const withdrawMutation = useWithdrawMeMutation({
    onSuccess: async () => {
      if (isMobile) await removeNativeFCM();
      resetAuthAndRouteToSignIn(router);
    },
  });
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [phoneNoticeOpen, setPhoneNoticeOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleChangePhoneNumber = () => {
    setPhoneNoticeOpen(true);
  };

  const handleWithdraw = () => {
    withdrawMutation.mutate();
  };

  const handleChangeStatus = () => {
    // TODO: 학적 상태 변경 로직 연결
  };

  return (
    <VStack gap="md" className="w-full px-4 pb-4">
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
        actions={[
          {
            type: PRIVACY_ACTION_TYPE.LOGOUT,
            onClick: () => setLogoutModalOpen(true),
          },
          {
            type: PRIVACY_ACTION_TYPE.WITHDRAW,
            onClick: () => setWithdrawModalOpen(true),
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

      <WithdrawConfirmModal
        open={withdrawModalOpen}
        onOpenChange={setWithdrawModalOpen}
        onConfirm={handleWithdraw}
      />
    </VStack>
  );
};
