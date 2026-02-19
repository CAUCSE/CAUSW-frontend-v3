import { CTAButton, Dialog } from '@causw/cds';

interface BlockUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string | number;
}

export const BlockUserDialog = ({
  open,
  setOpen,
  userId,
}: BlockUserDialogProps) => {
  const handleBlock = () => {
    console.log('차단 API 호출', userId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Title>test</Dialog.Title>
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center"></div>
        <Dialog.Footer>
          <CTAButton onClick={handleBlock} color="dark" fullWidth>
            신고하기
          </CTAButton>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
