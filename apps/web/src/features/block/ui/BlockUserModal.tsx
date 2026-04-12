import { ConfirmModal } from '@/shared/ui';

interface BlockUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
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

  return (
    <ConfirmModal
      title="이 작성자의 게시물이 목록에 노출되지 않으며, 다시 해제하실 수 없습니다."
      open={open}
      onOpenChange={setOpen}
      titleTypo="subtitle-16-bold"
      onConfirm={handleBlock}
      confirmText="차단하기"
      confirmColor="red"
    />
  );
};
