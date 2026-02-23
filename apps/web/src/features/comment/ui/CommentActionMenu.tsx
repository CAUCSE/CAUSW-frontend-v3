import { Dropdown, Menu } from '@causw/cds';

import { CommentAction } from '../model';

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
    <Dropdown open={isOpen} onOpenChange={() => onToggle(id)}>
      <Dropdown.Trigger asChild>
        <button className="translate-x-1 cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-100">
          <Menu size={20} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        {isMine ? (
          <>
            <Dropdown.Item
              color="red"
              onClick={() => handleMenuAction('delete')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              삭제하기
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item
              onClick={() => handleMenuAction('report')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              신고하기
            </Dropdown.Item>

            <Dropdown.Item
              color="red"
              onClick={() => handleMenuAction('block')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              차단하기
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
};
