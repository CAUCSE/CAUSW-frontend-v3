'use client';

import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Text, VStack } from '@causw/cds';

import { useLinkifiedText } from '@/shared/hooks';
import { sanitizeHtml } from '@/shared/lib/sanitizer';

import { PostImage } from './PostImage';

interface PostBodyProps {
  title?: string | null;
  content: string;
  images?: string[];
  enableImageViewer?: boolean;
  isCollapsed?: boolean;
  maxLines?: number;
  onExpand?: () => void;
  showExpandButton?: boolean;
  isHtml?: boolean;
}

/**
 * 게시글 본문 영역을 렌더링하는 UI 컴포넌트입니다.
 *
 * - 텍스트와 이미지 표시
 * - 줄 수 제한 및 "더보기" 버튼 노출 여부는 상위 레이어에서 제어
 *
 * @example
 * // 12줄 제한 + 더보기
 * <PostBody
 *   content={post.content}
 *   images={post.images}
 *   isCollapsed={!expanded}
 *   maxLines={12}
 *   showExpandButton
 *   onExpand={() => setExpanded(true)}
 * />
 */
export const PostBody = ({
  title,
  content,
  images = [],
  enableImageViewer = true,
  isCollapsed = false,
  maxLines = 12,
  onExpand,
  showExpandButton = false,
  isHtml = false,
}: PostBodyProps) => {
  const textRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sanitizedHtml = isHtml ? sanitizeHtml(content) : '';
  const collapseStyles: CSSProperties | undefined = isCollapsed
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as const,
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
      }
    : undefined;

  const { linkifiedContent } = useLinkifiedText({ content, isHtml });

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    if (isCollapsed) {
      const hasOverflow = el.scrollHeight > el.clientHeight + 1;
      setIsOverflowing(hasOverflow);
    }
  }, [content, isCollapsed, maxLines]);

  return (
    <VStack gap="md" className="mt-2">
      <VStack gap="none">
        {title?.trim() && (
          <Text
            typography="subtitle-16-bold"
            textColor="gray-800"
            className="mb-1 break-all"
          >
            {title}
          </Text>
        )}

        {isHtml ? (
          <Text
            ref={textRef as RefObject<HTMLDivElement>}
            as="div"
            typography="body-15-regular"
            textColor="gray-700"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            suppressHydrationWarning
            style={collapseStyles}
            className="max-w-full overflow-x-auto break-all [&_a]:break-all [&_a]:text-blue-600 [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_table]:mr-0! [&_table]:w-full! [&_table]:max-w-none [&_table]:table-auto [&_table]:border-collapse [&_table]:break-all [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:break-normal [&_th]:border [&_th]:border-gray-200 [&_th]:px-3 [&_th]:py-2 [&_th]:break-normal [&_tr]:border [&_tr]:border-gray-200"
          />
        ) : (
          <Text
            ref={textRef as RefObject<HTMLParagraphElement>}
            as="p"
            typography="body-15-regular"
            textColor="gray-700"
            className="break-all whitespace-pre-wrap"
            style={collapseStyles}
          >
            {linkifiedContent}
          </Text>
        )}

        {showExpandButton && isCollapsed && isOverflowing && (
          <button onClick={onExpand} className="mt-3 cursor-pointer self-start">
            <Text typography="body-14-regular" textColor="gray-400">
              더보기
            </Text>
          </button>
        )}
      </VStack>

      {images.length > 0 && (
        <PostImage
          images={images}
          enableViewer={enableImageViewer}
          sliderClassName="-mr-5 pr-5"
        />
      )}
    </VStack>
  );
};
