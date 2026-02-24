import { Stack, Text } from '@causw/cds';

export const PostBody = () => {
  return (
    <Stack gap="md" className="">
      <Text
        as="p"
        typography="body-16-regular"
        textColor="gray-800"
        className="prose whitespace-pre-wrap"
      >
        (구글폼 링크 수정) 2025-2학기 일반대학원 컴퓨터공학과 오픈랩(OPEN LAB)
        오프라인 개최 안내
      </Text>

      {/* TODO: 이미지 모듈 */}
    </Stack>
  );
};
