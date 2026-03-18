'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

import { Text, VStack } from '@causw/cds';

import { sanitizeHtml } from '@/shared/lib';

import { PostImage } from './PostImage';

interface PostBodyProps {
  content: string;
  images?: string[];
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
  content,
  images = [],
  isCollapsed = false,
  maxLines = 12,
  onExpand,
  showExpandButton = false,
  isHtml = false,
}: PostBodyProps) => {
  const textRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sanitizedHtml = isHtml ? sanitizeHtml(content) : '';
  const collapseStyles = isCollapsed
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as const,
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
      }
    : undefined;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    if (isCollapsed) {
      const hasOverflow = el.scrollHeight > el.clientHeight + 1;
      setIsOverflowing(hasOverflow);
    }
  }, [content, isCollapsed, maxLines]);

  return (
    <VStack gap="md">
      <VStack gap="sm" align="start">
        {isHtml ? (
          <Text
            ref={textRef as RefObject<HTMLDivElement>}
            as="div"
            typography="body-16-regular"
            textColor="gray-800"
            className="min-w-0 break-all"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            suppressHydrationWarning
            style={collapseStyles}
          />
        ) : (
          <Text
            ref={textRef as RefObject<HTMLParagraphElement>}
            as="p"
            typography="body-16-regular"
            textColor="gray-800"
            className="min-w-0 break-all whitespace-pre-wrap"
            style={collapseStyles}
          >
            {content}
          </Text>
        )}

        {showExpandButton && isCollapsed && isOverflowing && (
          <button onClick={onExpand} className="cursor-pointer">
            <Text typography="body-14-regular" textColor="gray-400">
              더보기
            </Text>
          </button>
        )}
      </VStack>

      {images.length > 0 && <PostImage images={images} />}
    </VStack>
  );
};
