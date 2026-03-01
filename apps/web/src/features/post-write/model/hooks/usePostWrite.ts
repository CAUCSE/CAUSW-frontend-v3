'use client';

import { useState } from 'react';

import { PostCategory } from '@/entities/post';

export const usePostWrite = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(
    null,
  );
  const [content, setContent] = useState('');
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const isSubmitActive = selectedCategory !== null && content.trim().length > 0;

  const isDirty = content.trim().length > 0 || selectedCategory !== null;

  return {
    isCategoryOpen,
    setIsCategoryOpen,
    selectedCategory,
    setSelectedCategory,
    content,
    setContent,
    isCancelConfirmOpen,
    setIsCancelConfirmOpen,
    isSubmitActive,
    isDirty,
  };
};
