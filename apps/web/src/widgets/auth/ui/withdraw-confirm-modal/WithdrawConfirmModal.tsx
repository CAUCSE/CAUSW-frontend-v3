'use client';

import { ConfirmModal } from '@/shared/ui';

interface WithdrawalConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const WithdrawConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: WithdrawalConfirmModalProps) => {
  return (
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title="회원 탈퇴하시겠습니까?"
      message={`탈퇴 후 30일 동안 계정 복구가 가능하며,\n이후에는 영구 삭제됩니다.`}
      confirmText="확인"
      cancelText="취소"
      confirmColor="red"
    />
  );
};
