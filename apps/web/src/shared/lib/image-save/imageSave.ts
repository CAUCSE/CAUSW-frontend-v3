import { getOriginalImageUrl } from '@/shared/lib';

export const saveImage = async (
  imageUrl: string,
  index: number,
): Promise<void> => {
  const originalUrl = getOriginalImageUrl(imageUrl);
  const response = await fetch(originalUrl);
  const blob = await response.blob();
  const extension = blob.type.split('/')[1] || 'jpg';
  const fileName = `image-${index + 1}.${extension}`;
  const file = new File([blob], fileName, { type: blob.type });

  // navigator.share (모바일 + Capacitor WebView)
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file] });
    return;
  }

  // fallback: blob download (데스크톱 등)
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
