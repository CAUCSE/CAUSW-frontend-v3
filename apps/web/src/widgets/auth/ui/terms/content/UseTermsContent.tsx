import {
  CTAButton,
  VStack,
  Text,
  Checkbox,
  Separator,
  HStack,
} from '@causw/cds';

// TODO: 보기 약관 내용 채우기
// TODO: 약관 상태관리 추가
// TODO: 완료하기 버튼 활성화 조건 추가

export const UseTermsContent = () => {
  return (
    <VStack className="gap-14">
      <VStack className="gap-10">
        <VStack justify="center" className="w-full">
          <Text
            as="h1"
            typography="title-22-bold"
            textColor="gray-800"
            className="whitespace-pre-wrap"
          >
            크자회 (CCSSAA){'\n'}
            <Text typography="title-22-bold" textColor="blue-700">
              약관 동의
            </Text>
            가 필요해요.
          </Text>
        </VStack>
        <VStack className="gap-5">
          <Checkbox>
            <Checkbox.Indicator />
            <Checkbox.Label typography="subtitle-18-bold" textColor="gray-700">
              네, 모두 동의합니다.
            </Checkbox.Label>
          </Checkbox>
          <Separator orientation="horizontal" />
          <HStack justify="center" align="center">
            <Checkbox>
              <Checkbox.Indicator />
              <Checkbox.Label typography="body-16-medium" textColor="gray-700">
                (필수) 서비스 이용약관
              </Checkbox.Label>
            </Checkbox>
            <Text
              className="ml-auto w-fit cursor-pointer"
              typography="body-16-medium"
              textColor="gray-400"
            >
              보기
            </Text>
          </HStack>
          <HStack justify="center" align="center">
            <Checkbox>
              <Checkbox.Indicator />
              <Checkbox.Label typography="body-16-medium" textColor="gray-700">
                (필수) 개인정보 수집 및 이용 동의
              </Checkbox.Label>
            </Checkbox>
            <Text
              className="ml-auto w-fit cursor-pointer"
              typography="body-16-medium"
              textColor="gray-400"
            >
              보기
            </Text>
          </HStack>
          <HStack justify="center" align="center">
            <Checkbox>
              <Checkbox.Indicator />
              <Checkbox.Label typography="body-16-medium" textColor="gray-700">
                (필수) 제3자 정보제공 동의
              </Checkbox.Label>
            </Checkbox>
            <Text
              className="ml-auto w-fit cursor-pointer"
              typography="body-16-medium"
              textColor="gray-400"
            >
              보기
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <CTAButton fullWidth color="dark">
        완료하기
      </CTAButton>
    </VStack>
  );
};
