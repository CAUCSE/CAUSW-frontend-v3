import {
  BottomSheet,
  Text,
  CTAButton,
  VStack,
  Checkbox,
  Separator,
  HStack,
} from '@causw/cds';

interface TermsBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// TODO: 보기 약관 내용 채우기
// TODO: 약관 상태관리 추가
// TODO: 완료하기 버튼 활성화 조건 추가
export const TermsBottomSheet = ({
  open,
  onOpenChange,
}: TermsBottomSheetProps) => {
  return (
    <BottomSheet headerAlign="left" open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Header className="hidden" title="제목" />

      <BottomSheet.Content>
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
          <BottomSheet.Body>
            <VStack className="gap-5">
              <Checkbox>
                <Checkbox.Indicator />
                <Checkbox.Label typography="subtitle-18-bold">
                  네, 모두 동의합니다.
                </Checkbox.Label>
              </Checkbox>
              <Separator orientation="horizontal" />
              <HStack justify="center" align="center">
                <Checkbox>
                  <Checkbox.Indicator />
                  <Checkbox.Label
                    typography="body-16-medium"
                    textColor="gray-700"
                  >
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
                  <Checkbox.Label
                    typography="body-16-medium"
                    textColor="gray-700"
                  >
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
            </VStack>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <CTAButton color="dark" fullWidth>
              완료하기
            </CTAButton>
          </BottomSheet.Footer>
        </VStack>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
