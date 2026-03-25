'use client';

import { useState } from 'react';

import { type ReplyTarget } from '@/entities/comment';

interface UseCommentFormProps {
  replyTarget: ReplyTarget;
  onCancelReply: () => void;
}

export const useCommentForm = ({
  replyTarget,
  onCancelReply,
}: UseCommentFormProps) => {
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = () => {
    if (!text.trim()) return;

    // TODO: replyTarget이 있으면 대댓글 API 호출, 없으면 일반 댓글 API 호출
    console.log('등록:', text, isAnonymous, replyTarget);

    setText('');
    onCancelReply();

    return true;
  };

  return {
    text,
    setText,
    isAnonymous,
    setIsAnonymous,
    handleSubmit,
  };
};
