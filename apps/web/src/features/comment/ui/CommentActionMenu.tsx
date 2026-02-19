import { Menu, Stack, Text } from '@causw/cds';

import { CommentAction } from '../model';

import { DropdownMenu } from '@/shared';

interface CommentActionMenuProps {
  id: string | number;
  isMine: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onClose: () => void;
  onAction: (action: CommentAction) => void;
}

export const CommentActionMenu = ({
  id,
  isMine,
  isOpen,
  onToggle,
  onClose,
  onAction,
}: CommentActionMenuProps) => {
  const handleMenuAction = (action: CommentAction) => {
    onAction(action);
    onClose();
  };

  return (
    <DropdownMenu
      isOpen={isOpen}
      onClose={onClose}
      onToggle={() => onToggle(id)}
      trigger={<Menu size={20} color="gray-500" />}
    >
      <Stack gap="none" className="divide-y divide-gray-100 py-1 break-keep">
        {isMine ? (
          // 내가 쓴 글 (삭제)
          <>
            <button
              onClick={() => handleMenuAction('delete')}
              className="cursor-pointer px-10 py-2.5"
            >
              <Text typography="subtitle-16-bold" textColor="red-400">
                삭제하기
              </Text>
            </button>
          </>
        ) : (
          // 남이 쓴 글 (신고/차단)
          <>
            <button
              onClick={() => handleMenuAction('report')}
              className="cursor-pointer px-10 py-2.5"
            >
              <Text typography="subtitle-16-bold" textColor="gray-800">
                신고하기
              </Text>
            </button>
            <button
              onClick={() => handleMenuAction('block')}
              className="cursor-pointer px-10 py-2.5"
            >
              <Text typography="subtitle-16-bold" textColor="red-400">
                차단하기
              </Text>
            </button>
          </>
        )}
      </Stack>
    </DropdownMenu>
  );
};
