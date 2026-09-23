import {
  type AcademicRecordGraduationRequest,
  type AcademicRecordReturnRequest,
} from '@/entities/setting';

import { API } from '@/shared/api';

const ACADEMIC_RECORD_API_PREFIX = '/api/v2/users/me/academic-record';

export const requestAcademicRecordReturn = async ({
  note,
  imageUuids = [],
  imageFileList,
}: AcademicRecordReturnRequest) => {
  const formData = new FormData();

  formData.append(
    'enrollmentApplicationRequest',
    new Blob([JSON.stringify({ note, imageUuids })], {
      type: 'application/json',
    }),
  );

  imageFileList.forEach((file) => {
    formData.append('imageFileList', file);
  });

  return API.post<void>(`${ACADEMIC_RECORD_API_PREFIX}/return`, formData);
};

export const requestAcademicRecordGraduation = async (
  data: AcademicRecordGraduationRequest,
) => {
  return API.post<void>(`${ACADEMIC_RECORD_API_PREFIX}/graduation`, data);
};
