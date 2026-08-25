'use client';

import { SOCIAL_PROVIDER_LABEL, type EmailFindResponse } from '@/entities/auth';

import { ConfirmModal } from '@/shared/ui';

import { savePendingDestination } from '../../lib';
import { useLogout } from '../../model/commands';

const SOCIAL_ACCOUNT_LINK_PATH = '/setting/privacy';

const buildGuideMessage = (account: EmailFindResponse): string => {
  const maskedEmail = account.email?.trim();
  const linkedProviderLabels = [
    ...new Set(
      (account.socialAccounts ?? []).map(
        ({ provider }) => SOCIAL_PROVIDER_LABEL[provider],
      ),
    ),
  ].join(', ');

  return [
    '이전에 회원가입된 내역이 존재해요.',
    '계정을 연동해드릴게요.',
    '',
    ...(maskedEmail ? [`가입 계정: ${maskedEmail}`] : []),
    linkedProviderLabels
      ? `기존에 연동된 ${linkedProviderLabels} 계정으로 로그인한 후 연동을 진행해주세요.`
      : '기존 계정으로 로그인한 후 연동을 진행해주세요.',
  ].join('\n');
};

interface AccountLinkGuideDialogProps {
  open: boolean;
  account: EmailFindResponse;
  onOpenChange: (open: boolean) => void;
}

export const AccountLinkGuideDialog = ({
  open,
  account,
  onOpenChange,
}: AccountLinkGuideDialogProps) => {
  const logout = useLogout();

  // 진행 중이던 소셜 가입(GUEST 세션)을 폐기하고,
  // 기존 계정 로그인 후 소셜 연동 화면으로 이동하도록 목적지를 저장한다.
  const handleConfirm = () => {
    savePendingDestination(SOCIAL_ACCOUNT_LINK_PATH);
    void logout();
  };

  return (
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      title="계정 연동하기"
      message={buildGuideMessage(account)}
      confirmText="로그인하러 가기"
      textAlign="left"
      onConfirm={handleConfirm}
    />
  );
};
