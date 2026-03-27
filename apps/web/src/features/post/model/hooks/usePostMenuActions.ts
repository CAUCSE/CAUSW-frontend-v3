'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useBlockUserByPostMutation } from '@/features/block';
import { useReportPostMutation } from '@/features/report';

import { type ReportReason } from '@/entities/report';

import { useDeletePostMutation } from '../mutations';
import { type PostAction } from '../types';

export const usePostMenuActions = (postId: string) => {
  const router = useRouter();
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
        if (!postId) return;
        router.push(`/feed/${postId}/edit`);
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
