'use client';

import * as Icons from '@causw/cds';
import { Box, Text } from '@causw/cds';

export const CONTACT_ICON_VARIANT = {
  SNS: 'sns',
  LIST: 'list',
  SNS_ADD: 'sns-add',
} as const;

type ContactIconVariant =
  (typeof CONTACT_ICON_VARIANT)[keyof typeof CONTACT_ICON_VARIANT];

interface ContactIconProps {
  variant: ContactIconVariant;
  url?: string;
  type?: 'career' | 'project';
  onClick?: () => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

const URL_ICON_MAP = [
  { keyword: 'instagram', Icon: Icons.InstagramLogo, label: '인스타그램' },
  { keyword: 'github', Icon: Icons.GithubLogo, label: '깃허브' },
  { keyword: 'linkedin', Icon: Icons.LinkedInLogo, label: '링크드인' },
  { keyword: 'tistory', Icon: Icons.TistoryLogo, label: '티스토리' },
  { keyword: 'notion', Icon: Icons.NotionLogo, label: '노션' },
  { keyword: 'blog.naver', Icon: Icons.NaverBlogLogo, label: '네이버 블로그' },
  { keyword: 'naver.com', Icon: Icons.NaverBlogLogo, label: '네이버 블로그' },
];

const getIconData = (type?: string, url?: string) => {
  if (type === 'career')
    return { Icon: Icons.BuildingColored, label: '경력', color: undefined };
  if (type === 'project')
    return { Icon: Icons.DocumentColored, label: '프로젝트', color: undefined };

  if (url) {
    const lowerUrl = url.toLowerCase();
    const matched = URL_ICON_MAP.find(({ keyword }) =>
      lowerUrl.includes(keyword),
    );
    if (matched)
      return { Icon: matched.Icon, label: matched.label, color: undefined };
  }

  return { Icon: Icons.Link, label: '기타 링크', color: 'gray-500' as const };
};

export const ContactIcon = ({
  variant,
  url,
  type,
  onClick,
  isEditing,
  onDelete,
}: ContactIconProps) => {
  if (variant === CONTACT_ICON_VARIANT.SNS_ADD) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-[60px] cursor-pointer flex-col items-center border-none bg-transparent p-0 outline-none"
      >
        <Box className="mb-1.5 flex h-[60px] w-[60px] items-center justify-center rounded-[1.25rem] bg-[#F5F6F8]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3.333V12.667M3.333 8H12.667" />
          </svg>
        </Box>
        <Text
          typography="body-15-semibold"
          className="w-full text-center whitespace-nowrap text-[#6B7280]"
        >
          추가하기
        </Text>
      </button>
    );
  }

  const { Icon, label, color } = getIconData(type, url);

  if (variant === CONTACT_ICON_VARIANT.SNS) {
    return (
      <button
        type="button"
        onClick={!isEditing ? onClick : undefined}
        className={`flex w-[60px] flex-col items-center border-none bg-transparent p-0 outline-none ${
          onClick && !isEditing ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="relative">
          <Box className="mb-1.5 flex h-[60px] w-[60px] items-center justify-center rounded-[1.25rem] bg-gray-100">
            <Icon size={24} color={color} />
          </Box>

          {isEditing && (
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onDelete?.();
                }
              }}
              className="absolute -top-1 -right-1 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full border-none bg-[#4B5563]"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" />
              </svg>
            </div>
          )}
        </div>
        <Text
          typography="body-15-semibold"
          className="w-full text-center whitespace-nowrap text-[#6B7280]"
        >
          {label}
        </Text>
      </button>
    );
  }

  return (
    <Box className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
      <Icon size={24} color={color} />
    </Box>
  );
};
