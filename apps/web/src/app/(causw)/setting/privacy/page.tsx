'use client';

import { Text, VStack } from '@causw/cds';

import {
  PrivacyActionSection,
  PrivacyAcademicInfoSection,
  PrivacyBasicInfoSection,
  PrivacyEnrollmentStatusSection,
} from '@/widgets/setting';

import { ActionHeader } from '@/shared/ui';

export default function Page() {
  // TODO: 실제 유저 데이터 API 연결 필요
  const user = {
    name: '홍길동',
    email: 'abced@cau.ac.kr',
    studentId: '20201234',
    major: '소프트웨어학부',
    enrollmentYear: '2020',
    enrollmentStatus: '재학',
    completedSemesters: 5,
    paidSemesters: 0,
    remainingSemesters: 0,
    currentSemesterFeeApplied: false,
  };

  const handleLogout = () => {
    // TODO: 로그아웃 로직 연결
    console.log('로그아웃');
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 로직 연결
    console.log('회원탈퇴');
  };

  const handleChangeStatus = () => {
    // TODO: 학적 상태 변경 로직 연결
    console.log('학적 상태 변경');
  };

  return (
    <VStack gap="sm" className="w-full">
      <ActionHeader>
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>

      <VStack gap="md" className="w-full px-4">
        <Text typography="title-22-bold" textColor="gray-800">
          개인정보 관리
        </Text>

        <PrivacyBasicInfoSection name={user.name} email={user.email} />

        <PrivacyAcademicInfoSection
          studentId={user.studentId}
          major={user.major}
          enrollmentYear={user.enrollmentYear}
        />

        <PrivacyEnrollmentStatusSection
          enrollmentStatus={user.enrollmentStatus}
          completedSemesters={user.completedSemesters}
          paidSemesters={user.paidSemesters}
          remainingSemesters={user.remainingSemesters}
          currentSemesterFeeApplied={user.currentSemesterFeeApplied}
          onChangeStatus={handleChangeStatus}
        />

        <PrivacyActionSection
          onLogout={handleLogout}
          onWithdraw={handleWithdraw}
        />
      </VStack>
    </VStack>
  );
}
