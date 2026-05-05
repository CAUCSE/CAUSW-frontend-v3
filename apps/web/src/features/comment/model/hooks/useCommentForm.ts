'use client';

import { useState } from 'react';

import { type ReplyTarget } from '@/entities/comment';

import { usePostCommentMutation, usePostReplyMutation } from '../mutations';

interface UseCommentFormProps {
  postId: string;
  replyTarget: ReplyTarget;
  onCancelReply: () => void;
}

export const useCommentForm = ({
  postId,
  replyTarget,
  onCancelReply,
}: UseCommentFormProps) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const { mutate: createComment } = usePostCommentMutation();
  const { mutate: createReply } = usePostReplyMutation();

  const handleSubmit = () => {
    if (!content.trim()) return;

    if (replyTarget) {
      createReply({
        parentCommentId: replyTarget.id,
        postId,
        content,
        isAnonymous,
      });
    } else {
      createComment({
        postId,
        content,
        isAnonymous,
      });
    }

    setContent('');
    onCancelReply();

    return true;
  };

  return {
    content,
    setContent,
    isAnonymous,
    setIsAnonymous,
    handleSubmit,
  };
};
