'use client';

import { useRouter } from 'next/navigation';

import {
  Text,
  VStack,
  HStack,
  CTAButton,
  KakaoTalkBlackLogo,
  AppleLogo,
  GoogleLogo,
} from '@causw/cds';

import type { EmailFindResponse, SocialProvider } from '@/entities/auth';

const SOCIAL_ICON_MAP: Record<
  SocialProvider,
  { icon: React.ReactNode; label: string }
> = {
  KAKAO: {
    icon: (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEE500]">
        <KakaoTalkBlackLogo size={12} />
      </div>
    ),
    label: '카카오',
  },
  APPLE: {
    icon: (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black">
        <AppleLogo size={12} />
      </div>
    ),
    label: 'Apple',
  },
  GOOGLE: {
    icon: (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <GoogleLogo size={12} />
      </div>
    ),
    label: 'Google',
  },
};

const formatDate = (dateStr: string) => {
  return dateStr.replace(/-/g, '. ');
};

interface FindEmailResultProps {
  data: EmailFindResponse;
  name: string;
  onFindPassword: () => void;
}

export const FindEmailResult = ({
  data,
  name,
  onFindPassword,
}: FindEmailResultProps) => {
  const router = useRouter();

  const hasEmail = !!data.email;
  const hasSocial = data.socialAccounts.length > 0;

  return (
    <VStack className="w-full gap-10">
      <VStack className="w-full gap-6">
        <VStack className="gap-1 px-1">
          <Text as="h1" typography="title-22-bold" textColor="gray-800">
            이메일 찾기 결과
          </Text>
          <Text typography="body-16-medium" textColor="gray-600">
            {name}님의 정보와 일치하는 계정 내역입니다.
          </Text>
        </VStack>

        {hasEmail && (
          <VStack className="gap-5 rounded-[1rem] bg-white p-5">
            <HStack className="items-center justify-between">
              <Text typography="body-16-medium" textColor="gray-500">
                이메일
              </Text>
              <Text typography="subtitle-16-bold" textColor="gray-700">
                {data.email}
              </Text>
            </HStack>
            <HStack className="items-center justify-between">
              <Text typography="body-16-medium" textColor="gray-500">
                가입일
              </Text>
              <Text typography="subtitle-16-bold" textColor="gray-700">
                {formatDate(data.createdAt)}
              </Text>
            </HStack>
          </VStack>
        )}

        {hasSocial && (
          <VStack className="gap-2">
            <Text
              typography="body-15-medium"
              textColor="gray-600"
              className="px-1"
            >
              연동된 소셜 계정
            </Text>
            <VStack className="gap-5 rounded-[1rem] bg-white p-5">
              {data.socialAccounts.map((account) => {
                const social = SOCIAL_ICON_MAP[account.provider];
                return (
                  <HStack
                    key={`${account.provider}-${account.createdAt}`}
                    className="items-center gap-3"
                  >
                    {social.icon}
                    <Text typography="body-14-regular" textColor="gray-600">
                      {social.label} 연동 계정 (가입일:{' '}
                      {formatDate(account.createdAt)})
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </VStack>
        )}
      </VStack>

      <HStack className="w-full gap-2">
        <CTAButton color="white" className="flex-1" onClick={onFindPassword}>
          비밀번호 찾기
        </CTAButton>
        <CTAButton
          color="dark"
          className="flex-1"
          onClick={() => router.push('/auth/sign-in')}
        >
          로그인
        </CTAButton>
      </HStack>
    </VStack>
  );
};
