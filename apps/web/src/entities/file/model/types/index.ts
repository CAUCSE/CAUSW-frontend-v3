import { FILE_PATH } from '../../config';

export type FilePath = (typeof FILE_PATH)[keyof typeof FILE_PATH];

export interface UploadFileResponseDto {
  fileId: string;
  fileUrl: string;
  originalFileName: string;
  extenstion: string;
}

export interface UploadMultipleFilesResponseDto {
  files: UploadFileResponseDto[];
  totalCount: number;
}
