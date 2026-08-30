'use client';

import { type BoardGroup } from '@/entities/feed';
import { usePostQuery } from '@/entities/post';

import { PostWriteForm } from './PostWriteForm';

interface PostEditFormProps {
  postId: string;
  boardGroup: BoardGroup;
  onClose: (isDirty: boolean) => void;
}

export const PostEditForm = ({
  postId,
  boardGroup,
  onClose,
}: PostEditFormProps) => {
  const { data: post } = usePostQuery(postId);

  return (
    <PostWriteForm
      onClose={onClose}
      boardGroup={boardGroup}
      postId={postId}
      initialData={{
        title: post.title ?? '',
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
