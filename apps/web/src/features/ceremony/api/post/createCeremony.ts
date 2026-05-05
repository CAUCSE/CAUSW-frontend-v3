import type { CeremonyCreateRequest } from '@/entities/ceremony';

import { API } from '@/shared/api';

export const createCeremony = (
  dto: CeremonyCreateRequest,
  imageFiles: File[],
) => {
  const formData = new FormData();

  formData.append(
    'ceremonyCreateRequest',
    new Blob([JSON.stringify(dto)], { type: 'application/json' }),
  );

  imageFiles.forEach((file) => formData.append('imageFileList', file));

  return API.post<void>('/api/v2/ceremonies', formData);
};
