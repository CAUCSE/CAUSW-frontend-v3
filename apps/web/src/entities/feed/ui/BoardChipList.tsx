'use client';

import { Chip, HStack, mergeStyles } from '@causw/cds';

import { Board } from '../model';

interface BoardChipListProps {
  boards: Board[];
  selectedBoard: Board | null;
  onSelectBoard: (board: Board) => void;
  onClose: () => void;
}
export const BoardChipList = ({
  boards,
  selectedBoard,
  onSelectBoard,
  onClose,
}: BoardChipListProps) => {
  return (
    <HStack gap="sm" className="flex-wrap">
      {boards.map((board) => {
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
