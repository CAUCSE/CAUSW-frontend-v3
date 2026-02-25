import { useFormContext, useWatch } from 'react-hook-form';

import { CTAButton, Flex, Field, TextInput, VStack } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/FormSection';

interface AddressSectionProps {
  showPostcode: boolean;
  postcodeRef: React.RefObject<HTMLDivElement | null>;
  setShowPostcode: (v: boolean) => void;
}

export const AddressSection = ({
  showPostcode,
  postcodeRef,
  setShowPostcode,
}: AddressSectionProps) => {
  const { control, register } = useFormContext<CeremonyFormData>();
  const [postalCode, address] = useWatch({
    control,
    name: ['postalCode', 'address'],
  });

  return (
    <FormSection title="주소" optional>
      <VStack gap="sm">
        <Flex gap="sm">
          <Field className="flex-1">
            <TextInput
              value={postalCode}
              readOnly
              placeholder="우편번호"
              className="rounded-xl bg-gray-200"
            />
          </Field>
          <CTAButton
            color="dark"
            className="w-[7.5rem] shrink-0"
            onClick={() => setShowPostcode(true)}
          >
            우편번호 찾기
          </CTAButton>
        </Flex>
        {showPostcode && (
          <div
            ref={postcodeRef}
            className="h-[25rem] w-full overflow-hidden rounded-xl border border-gray-200"
          />
        )}
        <Field>
          <TextInput
            value={address}
            readOnly
            placeholder="주소"
            className="rounded-xl bg-gray-200"
          />
        </Field>
        <Field>
          <TextInput
            {...register('detailAddress')}
            placeholder="상세주소를 입력해주세요."
            className="rounded-xl bg-white"
          />
        </Field>
      </VStack>
    </FormSection>
  );
};
