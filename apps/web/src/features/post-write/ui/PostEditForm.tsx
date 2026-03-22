'use client';

import { usePostQuery } from '@/entities/post';

import { PostWriteForm } from './PostWriteForm';

interface PostEditFormProps {
  postId: string;
  onClose: (isDirty: boolean) => void;
}

export const PostEditForm = ({ postId, onClose }: PostEditFormProps) => {
  const { data: post } = usePostQuery(postId);

  return (
    <PostWriteForm
      onClose={onClose}
      postId={postId}
      initialData={{
        content: post.content,
        boardId: post.boardId,
        isAnonymous: post.isAnonymous,
        images: [], // Existing images cannot be displayed correctly in current ImageUploadField without refactoring
        vote: null,
      }}
    />
  );
};
