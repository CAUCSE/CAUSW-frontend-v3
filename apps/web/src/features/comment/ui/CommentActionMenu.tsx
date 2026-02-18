import { Menu, Stack, Text } from '@causw/cds';

import { DropdownMenu } from '@/shared';

interface CommentActionMenuProps {
  id: string | number;
  isMine: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onClose: () => void;
}

export const CommentActionMenu = ({
  id,
  isMine,
  isOpen,
  onToggle,
  onClose,
}: CommentActionMenuProps) => {
  const handleMenuAction = (action: string) => {
    // TODO: 메뉴 액션에 따른 API 호출 (예: deleteComment(id))
    console.log(`댓글 ${id}번 액션: ${action}`);
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
          // Case A: 내가 쓴 글 (수정/삭제)
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
          // Case B: 남이 쓴 글 (신고/차단)
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
