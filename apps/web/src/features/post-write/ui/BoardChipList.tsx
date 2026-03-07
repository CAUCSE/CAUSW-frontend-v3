'use client';

import { Chip, HStack, mergeStyles } from '@causw/cds';

import { Board, useGetAvailableBoards } from '@/entities/feed';

interface BoardChipListProps {
  selectedBoard: Board | null;
  onSelectBoard: (board: Board) => void;
  onClose: () => void;
}
export const BoardChipList = ({
  selectedBoard,
  onSelectBoard,
  onClose,
}: BoardChipListProps) => {
  const { data } = useGetAvailableBoards();

  return (
    <HStack gap="sm" className="flex-wrap">
      {data.boards.map((board) => {
        const isActive = selectedBoard?.id === board.id;

        return (
          <Chip
            key={board.id}
            asChild
            color="lightgray"
            className={mergeStyles(
              'cursor-pointer rounded-sm transition-colors',
              isActive
                ? 'bg-gray-700 text-white opacity-80'
                : 'hover:bg-gray-200 active:bg-gray-200',
            )}
          >
            <button
              type="button"
              onClick={() => {
                onSelectBoard(board);
                onClose();
              }}
            >
              {board.name}
            </button>
          </Chip>
        );
      })}
    </HStack>
  );
};
