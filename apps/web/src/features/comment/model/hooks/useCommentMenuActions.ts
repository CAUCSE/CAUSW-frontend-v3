'use client';

import { useState } from 'react';

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

  const handleAction = (action: CommentAction) => {
    setActiveModal(action);
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

  const submitReport = () => {
    console.log(`${targetId}번 댓글 신고 제출`);
    // TODO: 신고 API mutation 호출
    closeModal();
  };

  const submitBlock = () => {
    console.log(`${targetId}번 댓글 작성자 차단`);
    // TODO: 차단 API mutation 호출
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
