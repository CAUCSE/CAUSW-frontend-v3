import { Menu, Stack, Text } from '@causw/cds';

import { PostAction } from '../model';

import { DropdownMenu } from '@/shared';

interface PostActionMenuProps {
  id: string | number;
  isMine: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onClose: () => void;
  onAction: (action: PostAction) => void;
}

export const PostActionMenu = ({
  id,
  isMine,
  isOpen,
  onToggle,
  onClose,
  onAction,
}: PostActionMenuProps) => {
  const handleMenuAction = (action: PostAction) => {
    onAction(action);
    onClose();
  };

  return (
    <DropdownMenu
      isOpen={isOpen}
      onClose={onClose}
      onToggle={() => onToggle(id)}
      trigger={<Menu size={21} color="gray-500" />}
    >
      <Stack gap="none" className="divide-y divide-gray-100 py-1 break-keep">
        {isMine ? (
          <>
            <button
              onClick={() => handleMenuAction('edit')}
              className="cursor-pointer px-10 py-2.5"
            >
              <Text typography="subtitle-16-bold" textColor="gray-800">
                수정하기
              </Text>
            </button>
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
