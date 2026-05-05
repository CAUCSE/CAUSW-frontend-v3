import type { ComponentProps } from 'react';

import { Text } from '@causw/cds';

type TextProps = ComponentProps<typeof Text>;

interface HighlightTextProps {
  /** 전체 텍스트 */
  text: string;
  /** 하이라이트할 부분 텍스트 */
  highlight: string;
  /** 기본 텍스트 typography */
  typography?: TextProps['typography'];
  /** 기본 텍스트 색상 */
  textColor?: TextProps['textColor'];
  /** 하이라이트 텍스트 색상 */
  highlightColor?: TextProps['textColor'];
}

/**
 * 텍스트 내 특정 부분을 하이라이트하여 렌더링하는 컴포넌트
 *
 * @example
 * ```tsx
 * <HighlightText
 *   text="중앙대학교 소프트웨어대학에 재적 중이어야 합니다."
 *   highlight="중앙대학교 소프트웨어대학"
 *   typography="body-15-medium"
 *   textColor="gray-500"
 *   highlightColor="blue-700"
 * />
 * ```
 */
export const HighlightText = ({
  text,
  highlight,
  typography = 'body-15-medium',
  textColor = 'gray-500',
  highlightColor = 'blue-700',
}: HighlightTextProps) => {
  const parts = text.split(highlight);

  if (parts.length === 1) {
    // 하이라이트 텍스트가 없으면 그냥 렌더
    return (
      <Text typography={typography} textColor={textColor}>
        {text}
      </Text>
    );
  }

  return (
    <>
      <Text typography={typography} textColor={textColor}>
        {parts[0]}
      </Text>
      <Text typography={typography} textColor={highlightColor}>
        {highlight}
      </Text>
      <Text typography={typography} textColor={textColor}>
        {parts[1]}
      </Text>
    </>
  );
};
