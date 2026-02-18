import { Menu, Stack, Text } from '@causw/cds';

import { DropdownMenu } from '@/shared';

interface PostActionMenuProps {
  id: string | number;
  isMine: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onClose: () => void;
}

export const PostActionMenu = ({
  id,
  isMine,
  isOpen,
  onToggle,
  onClose,
}: PostActionMenuProps) => {
  const handleMenuAction = (action: string) => {
    // TODO: 실제 수정/삭제/신고/차단 로직 연결
    console.log(`선택된 액션: ${action}`);
    onClose(); // 액션 후 메뉴 닫기
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
          // Case A: 내가 쓴 글 (수정/삭제)
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
