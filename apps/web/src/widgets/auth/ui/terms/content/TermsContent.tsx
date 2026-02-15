'use client';

import {
  CTAButton,
  VStack,
  Text,
  Checkbox,
  Separator,
  HStack,
} from '@causw/cds';

import { useTermsAgreementStore } from '@/entities/auth';

// TODO: 보기 약관 내용 채우기

export const TermsContent = () => {
  const serviceTermsAgreed = useTermsAgreementStore(
    (state) => state.serviceTermsAgreed,
  );
  const privacyPolicyAgreed = useTermsAgreementStore(
    (state) => state.privacyPolicyAgreed,
  );
  const thirdPartySharingAgreed = useTermsAgreementStore(
    (state) => state.thirdPartySharingAgreed,
  );
  const setServiceTermsAgreed = useTermsAgreementStore(
    (state) => state.setServiceTermsAgreed,
  );
  const setPrivacyPolicyAgreed = useTermsAgreementStore(
    (state) => state.setPrivacyPolicyAgreed,
  );
  const setThirdPartySharingAgreed = useTermsAgreementStore(
    (state) => state.setThirdPartySharingAgreed,
  );
  const setAllRequiredTermsAgreed = useTermsAgreementStore(
    (state) => state.setAllRequiredTermsAgreed,
  );
  const reset = useTermsAgreementStore((state) => state.reset);

  const isAllRequiredTermsAgreed =
    serviceTermsAgreed && privacyPolicyAgreed && thirdPartySharingAgreed;

  const handleServiceTermsView = () => {
    // TODO: 약관 보기 모달 띄우기
    console.log('서비스 이용약관 보기');
  };

  const handlePrivacyPolicyView = () => {
    // TODO: 약관 보기 모달 띄우기
    console.log('개인정보 수집 및 이용 동의 보기');
  };

  const handleThirdPartySharingView = () => {
    // TODO: 약관 보기 모달 띄우기
    console.log('제3자 정보제공 동의 보기');
  };

  const requiredTerms = [
    {
      id: 'service-terms',
      label: '(필수) 서비스 이용약관',
      checked: serviceTermsAgreed,
      onCheckedChange: setServiceTermsAgreed,
      onViewClick: handleServiceTermsView,
    },
    {
      id: 'privacy-policy',
      label: '(필수) 개인정보 수집 및 이용 동의',
      checked: privacyPolicyAgreed,
      onCheckedChange: setPrivacyPolicyAgreed,
      onViewClick: handlePrivacyPolicyView,
    },
    {
      id: 'third-party-sharing',
      label: '(필수) 제3자 정보제공 동의',
      checked: thirdPartySharingAgreed,
      onCheckedChange: setThirdPartySharingAgreed,
      onViewClick: handleThirdPartySharingView,
    },
  ] as const;

  const handleCompleteClick = () => {
    if (!isAllRequiredTermsAgreed) return;
    reset();
  };

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
          <Checkbox
            checked={isAllRequiredTermsAgreed}
            onCheckedChange={setAllRequiredTermsAgreed}
          >
            <Checkbox.Indicator />
            <Checkbox.Label typography="subtitle-18-bold" textColor="gray-700">
              네, 모두 동의합니다.
            </Checkbox.Label>
          </Checkbox>
          <Separator orientation="horizontal" />
          {requiredTerms.map((term) => (
            <HStack key={term.id} justify="center" align="center">
              <Checkbox
                checked={term.checked}
                onCheckedChange={term.onCheckedChange}
              >
                <Checkbox.Indicator />
                <Checkbox.Label
                  typography="body-16-medium"
                  textColor="gray-700"
                >
                  {term.label}
                </Checkbox.Label>
              </Checkbox>
              <Text
                onClick={term.onViewClick}
                className="ml-auto w-fit cursor-pointer"
                typography="body-16-medium"
                textColor="gray-400"
              >
                보기
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <CTAButton
        fullWidth
        color="dark"
        disabled={!isAllRequiredTermsAgreed}
        onClick={handleCompleteClick}
      >
        완료하기
      </CTAButton>
    </VStack>
  );
};
