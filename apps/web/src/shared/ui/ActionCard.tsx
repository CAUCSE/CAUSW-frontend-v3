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
  link?: string;
  className?: string;
  rightElement?: ReactNode;
}

export function ActionCard({
  title,
  descriptions,
  icon,
  iconBgClass = 'bg-gray-100',
  link,
  className,
  rightElement,
}: ActionCardProps) {
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
          <Text typography="subtitle-16-bold" className="truncate">
            {title}
          </Text>
          <HStack className="items-center gap-1 text-sm text-gray-400">
            {descriptions.map((desc, idx) => (
              <React.Fragment key={idx}>
                {typeof desc === 'string' ? (
                  <Text typography="body-14-regular" textColor="gray-400">
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
  if (!link) return CardContent;

  return (
    <Link href={link} className="w-full cursor-pointer">
      {CardContent}
    </Link>
  );
}
