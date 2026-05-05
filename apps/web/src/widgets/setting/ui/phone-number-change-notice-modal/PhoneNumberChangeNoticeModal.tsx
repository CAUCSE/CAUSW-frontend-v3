'use client';

import { Button, Modal, Text } from '@causw/cds';

import { ADMIN_CONTACT } from '@/shared/constants';
import { toast } from '@/shared/model';

interface PhoneNumberChangeNoticeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PhoneNumberChangeNoticeModal = ({
  open,
  onOpenChange,
}: PhoneNumberChangeNoticeModalProps) => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ADMIN_CONTACT.EMAIL);
      toast.success('이메일이 복사되었습니다.');
    } catch {
      toast.error('이메일 복사에 실패했습니다.');
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title>전화번호 변경 안내</Modal.Title>
        <Modal.Description>
          전화번호 변경은 관리자 메일로 문의해주세요.
        </Modal.Description>

        <div className="mt-4 flex items-center gap-2 rounded-[0.75rem] bg-gray-50 px-4 py-3">
          <Text typography="body-15-semibold" textColor="gray-800">
            {ADMIN_CONTACT.EMAIL}
          </Text>
          <Button
            size="sm"
            color="gray"
            onClick={handleCopyEmail}
            aria-label="이메일 주소 복사"
          >
            복사
          </Button>
        </div>

        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" fullWidth>
              확인
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
