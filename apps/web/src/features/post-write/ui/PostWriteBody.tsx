import { ArrowDown, Chip, TextArea } from '@causw/cds';

interface PostWriteBodyProps {
  onSelectorClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory: string | null;
  content: string;
  setContent: (content: string) => void;
}

export const PostWriteBody = ({
  onSelectorClick,
  selectedCategory,
  content,
  setContent,
}: PostWriteBodyProps) => {
  return (
    <>
      <Chip
        asChild
        color="lightgray"
        className="transition-color mx-4 w-fit shrink-0 cursor-pointer hover:bg-gray-200 active:bg-gray-200 md:mt-4"
      >
        <button onClick={onSelectorClick}>
          {selectedCategory ? selectedCategory : '주제를 선택해주세요'}{' '}
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Chip>

      <TextArea className="mx-5 my-4 mb-0 flex-1 p-0 ring-0 focus-within:ring-0">
        <TextArea.Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          resize={false}
          placeholder="내용을 입력하세요"
          className="h-full"
          style={{
            scrollbarWidth: 'auto',
            msOverflowStyle: 'auto',
          }}
        />
      </TextArea>
    </>
  );
};
