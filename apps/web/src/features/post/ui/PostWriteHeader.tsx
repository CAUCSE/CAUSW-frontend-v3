import { ActionHeader } from '@/shared/ui';

interface PostWriteHeaderProps {
  isSubmitActive: boolean;
  onBack: () => void;
}

export const PostWriteHeader = ({
  isSubmitActive,
  onBack,
}: PostWriteHeaderProps) => {
  return (
    <ActionHeader
      background="white"
      isSticky={false}
      className="shrink-0 md:border-b md:border-gray-100"
    >
      <ActionHeader.BackButton onClick={onBack}>뒤로</ActionHeader.BackButton>
      <ActionHeader.ActionButton
        disabled={!isSubmitActive}
        buttonColor={isSubmitActive ? 'blue' : 'gray'}
      >
        글 작성
      </ActionHeader.ActionButton>
    </ActionHeader>
  );
};
