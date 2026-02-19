import React, { ReactNode } from 'react';

import Link from 'next/link';

import {
  HStack,
  VStack,
  Text,
  Separator,
  mergeStyles,
  ChevronRight,
} from '@causw/cds';

interface ActionCardProps {
  title: string;
  descriptions: ReactNode[];
  icon: ReactNode;
  iconBgClass?: string;
  /** 'sm'은 h-10(40px), 'md'는 h-12(48px) */
  size?: 'sm' | 'md';
  link?: string;
  /** 외부 컨테이너 추가 스타일 (border, padding 등) */
  className?: string;
  rightElement?: ReactNode;
}

export function ActionCard({
  title,
  descriptions,
  icon,
  iconBgClass = 'bg-gray-100',
  size = 'sm',
  link,
  className,
  rightElement,
}: ActionCardProps) {
  const isMd = size === 'md';

  const CardContent = (
    <HStack
      className={mergeStyles(
        'w-full items-center justify-between transition-colors',
        isMd ? 'gap-4' : 'gap-5',
        className,
      )}
    >
      <HStack
        className={mergeStyles('flex-1 items-center', isMd ? 'gap-4' : 'gap-5')}
      >
        <div
          className={mergeStyles(
            'flex shrink-0 items-center justify-center rounded-[0.75rem]',
            isMd ? 'h-12 w-12' : 'h-10 w-10',
            iconBgClass,
          )}
        >
          {icon}
        </div>

        <VStack
          className={mergeStyles(
            'flex-1 justify-center overflow-hidden',
            isMd ? 'gap-1' : 'gap-0.5',
          )}
        >
          <Text
            typography="subtitle-16-bold"
            className="truncate text-gray-900"
          >
            {title}
          </Text>
          <HStack className="items-center gap-1 text-sm text-gray-400">
            {descriptions.map((desc, idx) => (
              <React.Fragment key={idx}>
                {typeof desc === 'string' ? (
                  <Text
                    typography={isMd ? 'body-14-medium' : 'body-14-regular'}
                    textColor="gray-400"
                  >
                    {desc}
                  </Text>
                ) : (
                  desc
                )}
                {idx < descriptions.length - 1 && (
                  <Separator
                    className="h-2 shrink-0 self-center bg-gray-200"
                    orientation="vertical"
                  />
                )}
              </React.Fragment>
            ))}
          </HStack>
        </VStack>
      </HStack>
      <div className="flex shrink-0 items-center justify-center">
        {rightElement
          ? rightElement
          : link && <ChevronRight size={14} className="text-gray-400" />}
      </div>
    </HStack>
  );
  //TODO : link가 어떻게 올지 모르곘음 api후에 수정
  if (!link || link === '') return CardContent;

  return (
    <Link href={link} className={mergeStyles('w-full', !isMd && 'block')}>
      {CardContent}
    </Link>
  );
}
