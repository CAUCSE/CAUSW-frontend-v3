'use client';

import { useState } from 'react';

import { useDeletePostMutation } from '../mutations';
import { PostAction } from '../types';

export const usePostMenuActions = (postId: string) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const { mutate: deletePost } = useDeletePostMutation();

  const handleAction = (action: PostAction) => {
    switch (action) {
      case 'report':
        setIsReportOpen(true);
        break;
      case 'block':
        setIsBlockOpen(true);
        break;
      case 'delete':
        if (!postId) return;
        deletePost(postId);
        break;
      case 'edit':
        // TODO: 게시글 수정 로직
        console.log(`id ${postId} 게시글 수정`);
        break;
      default:
        console.log(action);
    }
  };

  const submitReport = () => {
    // TODO: 신고 API 호출
    console.log('신고 제출');
    setIsReportOpen(false);
  };

  const submitBlock = () => {
    // TODO: 차단 API 호출
    console.log('차단 제출');
    setIsBlockOpen(false);
  };

  return {
    isReportOpen,
    setIsReportOpen,
    isBlockOpen,
    setIsBlockOpen,
    handleAction,
    submitReport,
    submitBlock,
  };
};
