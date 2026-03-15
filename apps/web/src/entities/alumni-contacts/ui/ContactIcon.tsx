'use client';

import * as Icons from '@causw/cds';
import { Box, VStack, Text } from '@causw/cds';

interface ContactIconProps {
  variant: 'sns' | 'list';
  url?: string;
  type?: 'career' | 'project';
  onClick?: () => void;
}

export const ContactIcon = ({
  variant,
  url,
  type,
  onClick,
}: ContactIconProps) => {
  const getIconData = () => {
    if (type === 'career')
      return { Icon: Icons.BuildingColored, label: '경력' };
    if (type === 'project')
      return { Icon: Icons.DocumentColored, label: '프로젝트' };

    if (url) {
      const lower = url.toLowerCase();
      if (lower.includes('instagram'))
        return { Icon: Icons.InstagramLogo, label: '인스타그램' };
      if (lower.includes('github'))
        return { Icon: Icons.GithubLogo, label: '깃허브' };
      if (lower.includes('linkedin'))
        return { Icon: Icons.LinkedInLogo, label: '링크드인' };
      if (lower.includes('tistory'))
        return { Icon: Icons.TistoryLogo, label: '티스토리' };
      if (lower.includes('notion'))
        return { Icon: Icons.NotionLogo, label: '노션' };
      if (lower.includes('blog.naver') || lower.includes('naver.com'))
        return { Icon: Icons.NaverBlogLogo, label: '네이버 블로그' };
    }
    return { Icon: Icons.Link, label: '기타 링크' };
  };

  const { Icon, label } = getIconData();

  if (variant === 'sns') {
    return (
      <VStack
        align="center"
        gap="none"
        className={`w-[60px] ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={onClick}
      >
        <Box className="mb-1.5 flex h-[60px] w-[60px] items-center justify-center rounded-[1.25rem] bg-gray-100">
          <Icon size={24} />
        </Box>
        <Text
          typography="body-14-regular"
          className="w-full text-center whitespace-nowrap text-gray-600"
        >
          {label}
        </Text>
      </VStack>
    );
  }

  return (
    <Box className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
      <Icon size={24} />
    </Box>
  );
};
