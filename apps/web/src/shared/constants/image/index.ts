export const IMAGE_UPLOAD_RULES = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILE_COUNT: 20,
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
};

export const ACCEPTED_IMAGE_TYPES =
  'image/jpeg, image/png, image/gif, image/bmp';

export const ACCEPTED_IMAGE_TYPE_LIST = ACCEPTED_IMAGE_TYPES.split(',').map(
  (type) => type.trim(),
);

export const IMAGE_TYPE_ERROR_MESSAGE = `${IMAGE_UPLOAD_RULES.ALLOWED_EXTENSIONS.map((extension) => extension.toUpperCase()).join(', ')} 이미지 파일만 첨부할 수 있습니다.`;
