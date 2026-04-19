'use client';

import { useState } from 'react';

import {
  useBlockUserByCommentMutation,
  useBlockUserByReplyMutation,
} from '@/features/block';
import {
  useReportCommentMutation,
  useReportReplyMutation,
} from '@/features/report';

import { type ReportReason } from '@/entities/report';

import { type CommentAction } from '../../config';
import { useDeleteCommentMutation, useDeleteReplyMutation } from '../mutations';

type ActiveModalType = CommentAction | null;

export const useCommentMenuActions = (
  postId: string,
  targetId: string,
  isReply?: boolean,
) => {
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const { mutate: deleteComment } = useDeleteCommentMutation(postId);
  const { mutate: deleteReply } = useDeleteReplyMutation(postId);
  const { mutate: reportComment } = useReportCommentMutation();
  const { mutate: reportReply } = useReportReplyMutation();
  const { mutate: blockUserByComment } = useBlockUserByCommentMutation(postId);
  const { mutate: blockUserByReply } = useBlockUserByReplyMutation(postId);

  const handleAction = (action: CommentAction) => {
    switch (action) {
      case 'report':
      case 'block':
      case 'delete':
        setActiveModal(action);
        break;
    }
  };

  const closeModal = () => setActiveModal(null);

  const submitDelete = () => {
    if (isReply) {
      deleteReply(targetId);
    } else {
      deleteComment(targetId);
    }
    closeModal();
  };

  const submitReport = (reason: ReportReason) => {
    if (isReply) {
      reportReply({ childCommentId: targetId, reportReason: reason });
    } else {
      reportComment({ commentId: targetId, reportReason: reason });
    }
    closeModal();
  };

  const submitBlock = () => {
    if (isReply) {
      blockUserByReply(targetId);
    } else {
      blockUserByComment(targetId);
    }
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
