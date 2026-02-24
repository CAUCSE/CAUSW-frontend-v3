import { Modal, Text } from '@causw/cds';

interface BlockUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  // TODO: API 연동 시 파라미터 구조 변경
  onSubmitBlock: () => void;
}

export const BlockUserModal = ({
  open,
  setOpen,
  onSubmitBlock,
}: BlockUserModalProps) => {
  const handleBlock = () => {
    onSubmitBlock();
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="w-[min(312px,calc(100%-32px))]">
        <Modal.Title className="sr-only">작성자 차단 안내</Modal.Title>
        <Modal.Description className="m-0">
          <Text typography="subtitle-16-bold" textColor="gray-800">
            이 작성자의 게시물이 목록에 노출되지 않으며, 다시 해제하실 수
            없습니다.
          </Text>
        </Modal.Description>

        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light" onClick={handleClose}>
              취소
            </Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" onClick={handleBlock}>
              확인
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
