import { useMutation } from '@tanstack/react-query';

import { FilePath } from '@/entities/file';

import { toast } from '@/shared/model';

import { uploadFile } from '../../api';

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: ({ file, type }: { file: File; type: FilePath }) =>
      uploadFile(file, type),
    onError: () => {
      toast.error('파일 업로드에 실패했어요.');
    },
  });
};
