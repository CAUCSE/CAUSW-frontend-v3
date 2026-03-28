'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useBlockUserByPostMutation } from '@/features/block';
import { useReportPostMutation } from '@/features/report';

import { type ReportReason } from '@/entities/report';

import { useDeletePostMutation } from '../mutations';
import { type PostAction } from '../types';

type ActiveModalType = PostAction | null;

export const usePostMenuActions = (postId: string) => {
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const { mutate: deletePost } = useDeletePostMutation();
  const { mutate: reportPost } = useReportPostMutation();
  const { mutate: blockUser } = useBlockUserByPostMutation();

  const handleAction = (action: PostAction) => {
    switch (action) {
      case 'report':
      case 'block':
      case 'delete':
        setActiveModal(action);
        break;
      case 'edit':
        router.push(`/feed/${postId}/edit`);
        break;
    }
  };

  const closeModal = () => setActiveModal(null);

  const submitDelete = () => {
    deletePost(postId);
    closeModal();
  };

  const submitReport = (reason: ReportReason) => {
    reportPost({ postId, reportReason: reason });
    closeModal();
  };

  const submitBlock = () => {
    blockUser(postId);
    closeModal();
  };

  return {
    activeModal,
    handleAction,
    closeModal,
    submitReport,
    submitBlock,
    submitDelete,
  };
};
