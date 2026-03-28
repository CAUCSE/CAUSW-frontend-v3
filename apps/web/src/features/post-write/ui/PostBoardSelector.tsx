'use client';

import { BottomSheet, Dialog, Text, VStack } from '@causw/cds';

import { Board, BoardChipList } from '@/entities/feed';

import { useBreakpoint } from '@/shared/hooks';

interface PostBoardSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBoard: Board | null;
  onSelectBoard: (board: Board) => void;
  boards: Board[];
}

export const PostBoardSelector = ({
  open,
  onOpenChange,
  selectedBoard,
  onSelectBoard,
  boards,
}: PostBoardSelectorProps) => {
  const { isMobileSize } = useBreakpoint();

  if (isMobileSize)
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheet.Content className="z-modal" aria-describedby={undefined}>
          <VStack gap="lg" align="start">
            <BottomSheet.Header title="게시글 주제를 선택해주세요." />
            <BottomSheet.Body>
              <BoardChipList
                boards={boards}
                selectedBoard={selectedBoard}
                onSelectBoard={onSelectBoard}
                onClose={() => onOpenChange(false)}
              />
            </BottomSheet.Body>
          </VStack>
        </BottomSheet.Content>
      </BottomSheet>
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={420} className="pt-8" aria-describedby={undefined}>
        <Dialog.Title asChild>
          <Text as="h2" typography="subtitle-18-bold" textColor="gray-700">
            게시글 주제를 선택해주세요.
          </Text>
        </Dialog.Title>
        <BoardChipList
          boards={boards}
          selectedBoard={selectedBoard}
          onSelectBoard={onSelectBoard}
          onClose={() => onOpenChange(false)}
        />
      </Dialog.Content>
    </Dialog>
  );
};
