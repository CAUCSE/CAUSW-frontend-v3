import {
  CTAButton,
  Checkbox,
  Chip,
  Close,
  Field,
  Modal,
  Plus,
  TextInput,
} from '@causw/cds';

import { FormSection } from '@/shared/ui/FormSection';

import type { CeremonyFormReturn } from '../model';

type Props = Pick<
  CeremonyFormReturn,
  | 'notifyAll'
  | 'setNotifyAll'
  | 'admissionYears'
  | 'showAdmissionYearModal'
  | 'setShowAdmissionYearModal'
  | 'admissionYearInput'
  | 'setAdmissionYearInput'
  | 'handleAddAdmissionYear'
  | 'handleRemoveAdmissionYear'
>;

export const AdmissionYearSection = ({
  notifyAll,
  setNotifyAll,
  admissionYears,
  showAdmissionYearModal,
  setShowAdmissionYearModal,
  admissionYearInput,
  setAdmissionYearInput,
  handleAddAdmissionYear,
  handleRemoveAdmissionYear,
}: Props) => (
  <>
    <FormSection title="경조사 알림 보낼 학번 설정">
      {!notifyAll && admissionYears.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {admissionYears.map((year) => (
            <Chip
              key={year}
              color="white"
              size="sm"
              onClick={() => handleRemoveAdmissionYear(year)}
              className="!rounded-sm !text-gray-500"
            >
              {year}학번
              <Close size={12} color="gray-500" />
            </Chip>
          ))}
        </div>
      )}
      <CTAButton
        color="white"
        fullWidth
        disabled={notifyAll}
        onClick={() => setShowAdmissionYearModal(true)}
        className={notifyAll ? '!bg-gray-200 !text-gray-300' : ''}
      >
        <Plus size={20} color={notifyAll ? 'gray-300' : 'gray-500'} />
        학번 추가
      </CTAButton>
      <div className="px-1">
        <Checkbox checked={notifyAll} onCheckedChange={setNotifyAll}>
          <Checkbox.Indicator />
          <Checkbox.Label>모든 학번에게 알림 전송</Checkbox.Label>
        </Checkbox>
      </div>
    </FormSection>

    <Modal
      open={showAdmissionYearModal}
      onOpenChange={(next) => {
        setShowAdmissionYearModal(next);
        if (!next) setAdmissionYearInput('');
      }}
    >
      <Modal.Content className="!rounded-[1.25rem] !pt-4">
        <Modal.Title className="sr-only">학번 추가하기</Modal.Title>
        <div className="flex w-full flex-col gap-8 px-4">
          <div className="flex flex-col gap-2">
            <div className="px-1">
              <span className="typo-subtitle-18-bold text-gray-700">
                학번 추가하기
              </span>
            </div>
            <Field>
              <TextInput
                value={admissionYearInput}
                onChange={(e) => setAdmissionYearInput(e.target.value)}
                placeholder="학번을 입력해주세요."
                inputMode="numeric"
                className="rounded-xl bg-gray-100"
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Modal.Close asChild>
              <CTAButton color="light" fullWidth>
                닫기
              </CTAButton>
            </Modal.Close>
            <CTAButton
              color="dark"
              fullWidth
              disabled={!admissionYearInput.trim()}
              onClick={handleAddAdmissionYear}
            >
              추가하기
            </CTAButton>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  </>
);
