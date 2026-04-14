'use client';
import { useShallow } from 'zustand/react/shallow';

import {
  CTAButton,
  Checkbox,
  HStack,
  Separator,
  Text,
  VStack,
} from '@causw/cds';

import { useTermsQuery } from '@/features/auth';

import {
  useTermsAgreementStore,
  useTermsDetailDialogStore,
} from '@/entities/auth';
import type { TermsAgreementRequestDto } from '@/entities/auth';

interface TermsContentProps {
  onComplete?: () => void;
  onSubmitTermsAgreement?:
    | ((params: TermsAgreementRequestDto) => void | Promise<void>)
    | null;
}

export const TermsContent = ({
  onComplete,
  onSubmitTermsAgreement,
}: TermsContentProps) => {
  const { data: terms } = useTermsQuery();
  const { agreements, setAgreement, setAllRequiredTermsAgreed, reset } =
    useTermsAgreementStore(
      useShallow((state) => ({
        agreements: state.agreements,
        setAgreement: state.setAgreement,
        setAllRequiredTermsAgreed: state.setAllRequiredTermsAgreed,
        reset: state.reset,
      })),
    );
  const openTermsDetailDialog = useTermsDetailDialogStore(
    (state) => state.open,
  );

  const requiredTerms = terms.filter((term) => term.isRequired);
  const requiredTermIds = requiredTerms.map((term) => term.id);
  const isAllRequiredTermsAgreed = requiredTerms.every(
    (term) => agreements[term.id],
  );

  const handleCompleteClick = async () => {
    if (!isAllRequiredTermsAgreed) return;
    await onSubmitTermsAgreement?.({
      termsIds: Object.entries(agreements)
        .filter(([_, checked]) => checked)
        .map(([id]) => id),
    });
    onComplete?.();
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
            onCheckedChange={(checked) =>
              setAllRequiredTermsAgreed(requiredTermIds, checked)
            }
          >
            <Checkbox.Indicator />
            <Checkbox.Label typography="subtitle-18-bold" textColor="gray-700">
              네, 모두 동의합니다.
            </Checkbox.Label>
          </Checkbox>
          <Separator orientation="horizontal" />
          {terms.map((term) => (
            <HStack key={term.id} justify="center" align="center">
              <Checkbox
                checked={Boolean(agreements[term.id])}
                onCheckedChange={(checked) => setAgreement(term.id, checked)}
              >
                <Checkbox.Indicator />
                <Checkbox.Label
                  typography="body-16-medium"
                  textColor="gray-700"
                >
                  {term.isRequired ? '(필수) ' : ''}
                  {term.title}
                </Checkbox.Label>
              </Checkbox>
              <Text
                onClick={() => openTermsDetailDialog(term)}
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
