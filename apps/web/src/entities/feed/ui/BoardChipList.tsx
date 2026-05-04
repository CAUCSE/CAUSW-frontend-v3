'use client';

import { Chip, HStack, mergeStyles } from '@causw/cds';

import { type Board } from '../model';

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
    <HStack gap="sm" className="min-w-0 flex-wrap">
      {boards.map((board) => {
        const isActive = selectedBoard?.id === board.id;

        return (
          <Chip
            key={board.id}
            asChild
            color="lightgray"
            className={mergeStyles(
              'max-w-full cursor-pointer rounded-sm transition-colors',
              isActive
                ? 'bg-gray-700 text-white opacity-80'
                : 'hover:bg-gray-200 active:bg-gray-200',
            )}
          >
            <button
              type="button"
              className="max-w-full min-w-0 shrink overflow-hidden"
              onClick={() => {
                onSelectBoard(board);
                onClose();
              }}
            >
              <span className="block truncate">{board.name}</span>
            </button>
          </Chip>
        );
      })}
    </HStack>
  );
};
