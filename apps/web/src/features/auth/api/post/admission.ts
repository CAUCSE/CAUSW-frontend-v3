import { type AdmissionCreateRequestDto } from '@/entities/auth';

import { API } from '@/shared/api';

export const createAdmission = async ({
  request,
  attachImages,
}: AdmissionCreateRequestDto) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' }),
  );

  attachImages.forEach((file) => {
    formData.append('attachImages', file);
  });

  return API.post<void>('/api/v2/users/me/admission', formData);
};
