export const CLOUDFRONT_DOMAIN = 'https://d72wley2drory.cloudfront.net';

// S3 버킷 도메인 매핑
const S3_BUCKET_DOMAINS: Record<string, string> = {
  'caucse-s3-bucket': 'caucse-s3-bucket.s3.ap-northeast-2.amazonaws.com',
  'caucse-s3-bucket-prod':
    'caucse-s3-bucket-prod.s3.ap-northeast-2.amazonaws.com',
};

interface ImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'jpg' | 'png';
}

// S3 URL을 CloudFront 경로로 변환
const toCloudFrontPath = (src: string): { url: URL; matched: boolean } => {
  if (!src) return { url: new URL('about:blank'), matched: false };

  let matchedBucket: string | null = null;
  let imagePath = src;

  for (const [bucket, domain] of Object.entries(S3_BUCKET_DOMAINS)) {
    if (src.includes(domain)) {
      matchedBucket = bucket;
      const parts = src.split(domain);
      if (parts.length > 1) {
        imagePath = parts[1];
      }
      break;
    }
  }

  if (!matchedBucket) {
    return { url: new URL(src), matched: false };
  }

  if (!imagePath.startsWith('/')) {
    imagePath = `/${imagePath}`;
  }

  // dev 버킷이면 /dev/ prefix 추가
  if (matchedBucket === 'caucse-s3-bucket') {
    imagePath = `/dev${imagePath}`;
  }

  return { url: new URL(`${CLOUDFRONT_DOMAIN}${imagePath}`), matched: true };
};

/**
 * S3 URL을 CloudFront 최적화 URL로 변환
 * S3 URL이 아닌 경우 원본 URL 반환
 */
export const getOptimizedImageUrl = (
  src: string,
  options: ImageOptions = {},
): string => {
  if (!src) return src;

  const { url, matched } = toCloudFrontPath(src);
  if (!matched) return src;

  if (options.width) {
    url.searchParams.set('w', options.width.toString());
  }
  if (options.quality) {
    url.searchParams.set('q', options.quality.toString());
  }
  if (options.format) {
    url.searchParams.set('f', options.format);
  }

  return url.toString();
};

// 원본 이미지 URL 생성 (최적화 없음)
export const getOriginalImageUrl = (src: string): string => {
  if (!src) return src;

  const { url, matched } = toCloudFrontPath(src);
  if (!matched) return src;

  url.searchParams.set('original', '');
  return url.toString().replace('original=', 'original');
};

// 다운로드용 URL 생성
export const getDownloadImageUrl = (src: string): string => {
  if (!src) return src;

  const { url, matched } = toCloudFrontPath(src);
  if (!matched) return src;

  url.searchParams.set('download', '');
  return url.toString().replace('download=', 'download');
};

// Next.js Image Component용 Loader
export const awsImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  return getOptimizedImageUrl(src, { width, quality, format: 'webp' });
};
