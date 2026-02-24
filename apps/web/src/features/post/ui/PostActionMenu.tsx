'use client';

import { useState } from 'react';

import { Dropdown, Menu } from '@causw/cds';

import { PostAction } from '../model';

interface PostActionMenuProps {
  isMine: boolean;
  onAction: (action: PostAction) => void;
}

export const PostActionMenu = ({ isMine, onAction }: PostActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuAction = (action: PostAction) => {
    onAction(action);
    setIsOpen(false);
  };

  return (
    <Dropdown open={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger asChild>
        <button className="h-fit translate-x-1 cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-100">
          <Menu size={21} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {isMine ? (
          <>
            <Dropdown.Item
              onClick={() => handleMenuAction('edit')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              수정하기
            </Dropdown.Item>
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
