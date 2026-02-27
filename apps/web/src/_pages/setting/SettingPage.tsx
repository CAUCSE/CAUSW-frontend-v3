'use client';
import {
  Avatar,
  BellColored,
  Box,
  ChevronRight,
  CommentColored,
  DocumentColored,
  Flex,
  Float,
  GearColored,
  HeartColored,
  HStack,
  LockOpenColored,
  Pen,
  PenColored,
  QuestionColored,
  Separator,
  SpeakerColored,
  TagColored,
  Text,
  VStack,
} from '@causw/cds';

export function SettingPage() {
  return (
    <Flex justify="center">
      <VStack
        align="center"
        gap="md"
        className="w-full max-w-[900px] px-5 py-8 md:px-8 md:py-10"
      >
        <span className="relative cursor-pointer">
          <Avatar size="120" className="my-1 shrink-0"></Avatar>
          <Float floatType="absolute" right={0} bottom={0}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black p-1.5">
              <Pen size={12} color="white" />
            </div>
          </Float>
        </span>
        <VStack align="center" gap="xs">
          <Text typography="subtitle-18-bold">이름</Text>
          <HStack gap="sm" align="center">
            <Text typography="body-16-regular" textColor="gray-400">
              이메일
            </Text>
            <Separator orientation="vertical" className="gray-400 h-2" />
            <Text typography="body-16-regular" textColor="gray-400">
              이메일
            </Text>
          </HStack>
        </VStack>
        <Box
          radius="lg"
          className="flex h-full w-full cursor-pointer justify-center bg-white px-4 py-3"
        >
          <Text typography="subtitle-18-bold" className="hover:text-gray-600">
            내 동문수첩 수정
          </Text>
        </Box>
        <Box
          radius="lg"
          className="flex h-full w-full justify-center bg-white px-4 py-3"
        >
          <HStack>
            <VStack gap="sm" align="center">
              <PenColored />
              <Text typography="body-14-medium" textColor="gray-700">
                내가 쓴 글
              </Text>
            </VStack>
            <Separator orientation="vertical" />
            <VStack gap="sm" align="center">
              <CommentColored />
              <Text typography="body-14-medium" textColor="gray-700">
                댓글 단 글
              </Text>
            </VStack>
            <Separator orientation="vertical" />
            <VStack gap="sm" align="center">
              <HeartColored />
              <Text typography="body-14-medium" textColor="gray-700">
                찜한 글
              </Text>
            </VStack>
          </HStack>
        </Box>
        <VStack
          gap="sm"
          className="flex h-full w-full rounded-lg bg-white px-4 py-5"
        >
          <Text typography="subtitle-18-bold" className="px-2">
            계정
          </Text>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <BellColored />
            <Text typography="body-16-regular" textColor="gray-800">
              알림 설정
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <TagColored />
            <Text typography="body-16-regular" textColor="gray-800">
              닉네임 변경
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <GearColored />
            <Text typography="body-16-regular" textColor="gray-800">
              개인 정보 관리
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <LockOpenColored />
            <Text typography="body-16-regular" textColor="gray-800">
              비밀번호 변경
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
        </VStack>
        <VStack
          gap="sm"
          className="flex h-full w-full rounded-lg bg-white px-4 py-5"
        >
          <Text typography="subtitle-18-bold" className="px-2">
            고객지원
          </Text>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <SpeakerColored />
            <Text typography="body-16-regular" textColor="gray-800">
              공지사항
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <QuestionColored />
            <Text typography="body-16-regular" textColor="gray-800">
              건의/오류 제보하기
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
          <HStack justify="center" align="center" className="gap-3.5 p-2">
            <DocumentColored />
            <Text typography="body-16-regular" textColor="gray-800">
              이용약관 확인
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
