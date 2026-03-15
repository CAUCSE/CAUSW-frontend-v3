import {
  FilePath,
  UploadFileResponseDto,
  UploadMultipleFilesResponseDto,
} from '@/entities/file';

import { API } from '@/shared/api';

/* 파일 단일 업로드 */
export const uploadFile = async (file: File, type: FilePath) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('filePath', type);

  const data = await API.post<UploadFileResponseDto>(
    `/api/v2/storage/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

/* 파일 다중 업로드 */
export const uploadMultipleFiles = async (files: File[], type: FilePath) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('type', type);

  const data = await API.post<UploadMultipleFilesResponseDto>(
    `/api/v2/storage/upload/multiple`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
