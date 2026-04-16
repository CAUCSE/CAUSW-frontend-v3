'use client';

import { useRouter } from 'next/navigation';

import {
  Button,
  CTAButton,
  HStack,
  SuccessColored,
  Text,
  VStack,
} from '@causw/cds';

import { toast } from '@/shared/model';

interface TemporaryPasswordIssuedProps {
  email: string;
  temporaryPassword: string;
}

const maskEmail = (email: string) => {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.length >= 3 ? local.slice(0, 3) : local;
  return `${visible}***@${domain}`;
};

export const TemporaryPasswordIssued = ({
  email,
  temporaryPassword,
}: TemporaryPasswordIssuedProps) => {
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(temporaryPassword);
    toast.success('비밀번호가 복사되었습니다.', {
      icon: <SuccessColored size={20} />,
    });
  };

  return (
    <VStack className="w-full gap-10">
      <VStack className="w-full gap-7">
        <VStack className="gap-1 px-1">
          <Text as="h1" typography="title-22-bold" textColor="gray-800">
            임시 비밀번호 발급
          </Text>
          <Text typography="body-16-medium" textColor="gray-600">
            안전을 위해 로그인 후 비밀번호를 변경하거나 지금 바로 새 비밀번호로
            재설정해 주세요.
          </Text>
        </VStack>

        <VStack className="gap-5 rounded-[1rem] bg-white p-5">
          <HStack className="items-center justify-between">
            <Text typography="body-16-medium" textColor="gray-500">
              이메일
            </Text>
            <Text typography="subtitle-16-bold" textColor="gray-700">
              {maskEmail(email)}
            </Text>
          </HStack>
          <HStack className="items-center justify-between">
            <Text typography="body-16-medium" textColor="gray-500">
              임시 비밀번호
            </Text>
            <HStack className="items-center gap-2">
              <Text typography="subtitle-16-bold" textColor="gray-700">
                {temporaryPassword}
              </Text>
              <Button size="sm" color="gray" onClick={handleCopy}>
                복사
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </VStack>

      <HStack className="w-full gap-2">
        <CTAButton
          color="white"
          className="flex-1"
          onClick={() => router.push('/auth/sign-in')}
        >
          로그인
        </CTAButton>
        <CTAButton
          color="dark"
          className="flex-1"
          onClick={() => router.replace('/auth/reset-password')}
        >
          비밀번호 재설정
        </CTAButton>
      </HStack>
    </VStack>
  );
};
