'use client';

import { useMutation } from '@tanstack/react-query';

import { FilePath } from '@/entities/file';

import { toast } from '@/shared/model';

import { uploadMultipleFiles } from '../../api';

export const useUploadMultipleFilesMutation = () => {
  return useMutation({
    mutationFn: ({ files, type }: { files: File[]; type: FilePath }) =>
      uploadMultipleFiles(files, type),
    onError: () => {
      toast.error('파일 업로드에 실패했어요.');
    },
  });
};
