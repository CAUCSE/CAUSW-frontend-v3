'use client';

import { type MouseEvent } from 'react';

import { Dropdown, Menu } from '@causw/cds';

import { type PostAction } from '../config';
import { usePostActionMenu } from '../model';

interface PostActionMenuProps {
  isMine: boolean;
  onAction: (action: PostAction) => void;
}

export const PostActionMenu = ({ isMine, onAction }: PostActionMenuProps) => {
  const menu = usePostActionMenu();
  const handleMenuAction = (
    event: MouseEvent<HTMLDivElement>,
    action: PostAction,
  ) => {
    event.stopPropagation();
    onAction(action);
    menu.setIsOpen(false);
  };

  return (
    <Dropdown open={menu.isOpen} onOpenChange={menu.setIsOpen}>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="게시글 메뉴 열기"
          className="h-fit translate-x-1 -translate-y-1 cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-100 active:bg-gray-100"
          onPointerDown={menu.handlePointerDown}
          onPointerMove={menu.handlePointerMove}
          onPointerCancel={menu.handlePointerCancel}
          onPointerUp={menu.handlePointerUp}
          onClick={menu.handleTriggerClick}
        >
          <Menu size={20} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content
        align="end"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        {isMine ? (
          <>
            <Dropdown.Item
              onClick={(event) => handleMenuAction(event, 'edit')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              수정하기
            </Dropdown.Item>
            <Dropdown.Item
              color="red"
              onClick={(event) => handleMenuAction(event, 'delete')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              삭제하기
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item
              onClick={(event) => handleMenuAction(event, 'report')}
              className="justify-center px-10 py-2.5 text-base font-bold"
            >
              신고하기
            </Dropdown.Item>
            <Dropdown.Item
              color="red"
              onClick={(event) => handleMenuAction(event, 'block')}
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
