import { Dialog, Flex } from '@causw/cds';

import { PostWriteBody } from './PostWriteBody';
import { PostWriteFooter } from './PostWriteFooter';
import { PostWriteHeader } from './PostWriteHeader';

interface PostWriteFormProps {
  isSubmitActive: boolean;
  onClose: () => void;
  onSelectorClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory: string | null;
  content: string;
  setContent: (content: string) => void;
}
export const PostWriteForm = ({
  isSubmitActive,
  onClose,
  onSelectorClick,
  selectedCategory,
  content,
  setContent,
}: PostWriteFormProps) => {
  return (
    <Flex gap="none" direction="column">
      <PostWriteHeader isSubmitActive={isSubmitActive} onBack={onClose} />

      <Dialog.Title className="sr-only">게시글 작성</Dialog.Title>
      <PostWriteBody
        onSelectorClick={onSelectorClick}
        selectedCategory={selectedCategory}
        content={content}
        setContent={setContent}
      />

      <Dialog.Footer>
        <PostWriteFooter />
      </Dialog.Footer>
    </Flex>
  );
};
