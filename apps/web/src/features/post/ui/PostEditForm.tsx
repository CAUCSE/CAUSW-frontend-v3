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
        images: (post.fileUrlList || []) as unknown as File[],
        vote: null,
      }}
      initialImages={post.fileUrlList}
    />
  );
};
