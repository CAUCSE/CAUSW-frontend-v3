'use client';

import { useState } from 'react';

import { useBlockUserByPostMutation } from '@/features/block';
import { useReportPostMutation } from '@/features/report';

import { ReportReason } from '@/entities/report';

import { useDeletePostMutation } from '../mutations';
import { PostAction } from '../types';

export const usePostMenuActions = (postId: string) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const { mutate: deletePost } = useDeletePostMutation();
  const { mutate: reportPost } = useReportPostMutation();
  const { mutate: blockUser } = useBlockUserByPostMutation();

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

  const submitReport = (reason: ReportReason) => {
    reportPost({ postId, reportReason: reason });
    setIsReportOpen(false);
  };

  const submitBlock = () => {
    blockUser(postId);
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
