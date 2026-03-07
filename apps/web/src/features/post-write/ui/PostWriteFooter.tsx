import { Button, Camera, Checkbox, HStack, Vote } from '@causw/cds';

interface PostWriteFooterProps {
  onClickPhoto: () => void;
  onClickVote: () => void;
}

export const PostWriteFooter = ({
  onClickPhoto,
  onClickVote,
}: PostWriteFooterProps) => {
  return (
    <HStack justify="between" className="shrink-0 p-5">
      <HStack className="gap-1.75">
        <Button type="button" onClick={onClickPhoto} className="text-gray-500">
          <Camera active size={16} />
          사진첨부
        </Button>
        <Button type="button" onClick={onClickVote} className="text-gray-500">
          <Vote active size={16} />
          투표
        </Button>
      </HStack>
      <Checkbox defaultChecked className="group gap-1">
        <Checkbox.Indicator />
        <Checkbox.Label
          typography="body-15-semibold"
          textColor="gray-800"
          className="transition-opacity duration-200 group-hover:opacity-70"
        >
          익명
        </Checkbox.Label>
      </Checkbox>
    </HStack>
  );
};
