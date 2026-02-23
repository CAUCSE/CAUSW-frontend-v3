import { CTAButton, Field, TextInput } from '@causw/cds';

import { FormSection } from '@/shared/ui/FormSection';

import type { CeremonyFormReturn } from '../model';

type Props = Pick<
  CeremonyFormReturn,
  | 'postalCode'
  | 'address'
  | 'detailAddress'
  | 'showPostcode'
  | 'postcodeRef'
  | 'setShowPostcode'
  | 'setDetailAddress'
>;

export const AddressSection = ({
  postalCode,
  address,
  detailAddress,
  showPostcode,
  postcodeRef,
  setShowPostcode,
  setDetailAddress,
}: Props) => (
  <FormSection title="주소" optional>
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
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
      </div>
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
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="상세주소를 입력해주세요."
          className="rounded-xl bg-white"
        />
      </Field>
    </div>
  </FormSection>
);
