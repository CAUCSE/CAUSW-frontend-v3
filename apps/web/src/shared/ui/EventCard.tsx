import React, { type ReactNode } from 'react';

import Link from 'next/link';

import {
  HStack,
  VStack,
  Text,
  Separator,
  mergeStyles,
  ChevronRight,
} from '@causw/cds';

interface EventCardProps {
  title: string;
  descriptions: ReactNode[];
  icon: ReactNode;
  iconBgClass?: string;
  link: string | null;
  className?: string;
  rightElement?: ReactNode;
}

export function EventCard({
  title,
  descriptions,
  icon,
  iconBgClass = 'bg-gray-100',
  link,
  className,
  rightElement,
}: EventCardProps) {
  const TITLE_INTERACTIVE_TEXT_STYLES =
    'transition-colors group-hover:text-gray-400 group-active:text-gray-400';
  const DESCRIPTION_INTERACTIVE_TEXT_STYLES =
    'transition-colors group-hover:text-gray-300 group-active:text-gray-300';
  const CHEVRON_INTERACTIVE_STYLES =
    'transition-colors fill-gray-400 group-hover:fill-gray-300 group-active:fill-gray-300';

  const CardContent = (
    <HStack
      className={mergeStyles(
        'w-full items-center justify-between gap-5 transition-colors',
        className,
      )}
    >
      <HStack className="flex-1 items-center gap-5">
        <div
          className={mergeStyles(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.75rem]',
            iconBgClass,
          )}
        >
          {icon}
        </div>

        <VStack className={'flex-1 justify-center gap-0 overflow-hidden'}>
          <Text
            typography="subtitle-16-bold"
            className={mergeStyles('truncate', TITLE_INTERACTIVE_TEXT_STYLES)}
          >
            {title}
          </Text>
          <HStack
            className={mergeStyles(
              'items-center gap-1 text-sm text-gray-400',
              DESCRIPTION_INTERACTIVE_TEXT_STYLES,
            )}
          >
            {descriptions.map((desc, idx) => (
              <React.Fragment key={idx}>
                {typeof desc === 'string' ? (
                  <Text
                    typography="body-14-regular"
                    textColor="gray-400"
                    className={DESCRIPTION_INTERACTIVE_TEXT_STYLES}
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
          : link && (
              <ChevronRight size={14} className={CHEVRON_INTERACTIVE_STYLES} />
            )}
      </div>
    </HStack>
  );

  if (!link) return CardContent;

  return (
    <Link href={link} className="group w-full cursor-pointer">
      {CardContent}
    </Link>
  );
}
