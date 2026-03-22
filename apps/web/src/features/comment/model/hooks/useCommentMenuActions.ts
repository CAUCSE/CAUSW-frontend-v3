'use client';

import { useState } from 'react';

import { CommentAction } from '../types';

export const useCommentMenuActions = (commentId: string | number) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAction = (action: CommentAction) => {
    switch (action) {
      case 'report':
        setIsReportOpen(true);
        break;
      case 'block':
        setIsBlockOpen(true);
        break;
      case 'delete':
        setIsDeleteOpen(true);
        break;
      default:
        console.log(action);
    }
  };

  const submitReport = () => {
    console.log(`${commentId}번 댓글 신고 제출`);
    setIsReportOpen(false);
  };

  const submitBlock = () => {
    console.log(`${commentId}번 댓글 작성자 차단`);
    setIsBlockOpen(false);
  };

  return {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    handleAction,
    submitReport,
    submitBlock,
  };
};
