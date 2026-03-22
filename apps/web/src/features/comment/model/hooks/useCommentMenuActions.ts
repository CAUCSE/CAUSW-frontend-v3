'use client';

import { useState } from 'react';

import { CommentAction } from '../../config';
import { useDeleteCommentMutation } from '../mutations';

type ActiveModalType = CommentAction | null;

export const useCommentMenuActions = (postId: string, commentId: string) => {
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const { mutate: deleteComment } = useDeleteCommentMutation(postId);

  const handleAction = (action: CommentAction) => {
    setActiveModal(action);
  };

  const closeModal = () => setActiveModal(null);

  const submitDelete = () => {
    deleteComment(commentId);
    closeModal();
  };

  const submitReport = () => {
    console.log(`${commentId}번 댓글 신고 제출`);
    // TODO: 신고 API mutation 호출
    closeModal();
  };

  const submitBlock = () => {
    console.log(`${commentId}번 댓글 작성자 차단`);
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
