import { Flex, Text, VStack } from '@causw/cds';

// TODO: 소통 탭 페이지 준비 후 노출
// import { AlumniContactsTab } from '@/widgets/alumni-contacts';

// TODO: 자유게시판을 '정보(구 커뮤니티)' 탭에서 이곳으로 이전
export const CommunityPage = () => {
  return (
    <VStack className="size-full">
      {/* TODO: 소통 탭 페이지 준비 후 노출 */}
      {/* <AlumniContactsTab /> */}
      <Flex justify="center" align="center" className="size-full">
        <Text typography="body-16-regular" textColor="gray-500">
          소통 탭은 준비 중입니다.
        </Text>
      </Flex>
    </VStack>
  );
};
