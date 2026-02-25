'use client';

import { FormProvider, Controller, useFormContext } from 'react-hook-form';

import { Dialog, Field, HStack, Tab, TextInput } from '@causw/cds';

import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import { ActionHeader } from '@/shared/ui/ActionHeader';
import { FormSection } from '@/shared/ui/FormSection';

import { CEREMONY_TYPES, CATEGORY_MAP, CUSTOM_VALUE } from '../config';
import { useCeremonyForm } from '../model';

import { AddressSection } from './AddressSection';
import { AdmissionYearSection } from './AdmissionYearSection';
import { CloseConfirmModal } from './CloseConfirmModal';
import { ContentSection } from './ContentSection';
import { DateTimeSection } from './DateTimeSection';
import { RelationshipSection } from './RelationshipSection';

interface CeremonyCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CeremonyCreateDialog = ({
  open,
  onOpenChange,
}: CeremonyCreateDialogProps) => {
  const { isMobileSize } = useBreakpoint();
  const form = useCeremonyForm();

  const handleCloseAttempt = () => {
    form.setShowCloseConfirm(true);
  };

  const handleConfirmClose = () => {
    form.setShowCloseConfirm(false);
    form.resetForm();
    onOpenChange(false);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleCloseAttempt();
      return;
    }
    onOpenChange(nextOpen);
  };

  return (
    <FormProvider {...form.methods}>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <Dialog.Content
          fullscreen={isMobileSize}
          className="overflow-hidden bg-gray-100 p-0 md:h-[calc(100vh-12.5rem)] md:w-full md:max-w-[43.75rem] md:rounded-[1rem]"
        >
          <Dialog.Title className="sr-only">경조사 등록 신청</Dialog.Title>
          <div className="absolute inset-0 flex flex-col overflow-clip md:px-4 md:py-6">
            <ActionHeader
              background="gray"
              isSticky={false}
              style={{ flexShrink: 0 }}
            >
              <ActionHeader.BackButton onClick={handleCloseAttempt}>
                뒤로
              </ActionHeader.BackButton>
              <ActionHeader.ActionButton
                disabled={!form.isValid}
                className={form.isValid ? '' : '!text-gray-300'}
              >
                신청하기
              </ActionHeader.ActionButton>
            </ActionHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 md:px-2 md:pt-4">
              <div className="flex flex-col gap-4 md:gap-5">
                <div className="px-1">
                  <h1 className="typo-title-22-bold text-gray-700">
                    경조사 등록 신청
                  </h1>
                </div>

                <div className="flex flex-col gap-10">
                  {/* 분류 */}
                  <TypeSection onTypeChange={form.handleTypeChange} />

                  {/* 상세 분류 */}
                  <CategorySection />

                  {/* 관계 */}
                  <RelationshipSection
                    onRelationshipChange={form.handleRelationshipChange}
                  />

                  {/* 경조사 기간 */}
                  <DateTimeSection
                    onEndDateToggle={form.handleEndDateToggle}
                    onTimeToggle={form.handleTimeToggle}
                  />

                  {/* 학번 설정 */}
                  <AdmissionYearSection
                    showAdmissionYearModal={form.showAdmissionYearModal}
                    setShowAdmissionYearModal={form.setShowAdmissionYearModal}
                    admissionYearInput={form.admissionYearInput}
                    setAdmissionYearInput={form.setAdmissionYearInput}
                    handleAddAdmissionYear={form.handleAddAdmissionYear}
                    handleRemoveAdmissionYear={form.handleRemoveAdmissionYear}
                  />

                  {/* 내용 (선택) */}
                  <ContentSection
                    imageUploadRef={form.imageUploadRef}
                    handleSetPhotoFiles={form.handleSetPhotoFiles}
                    photoResetTrigger={form.photoResetTrigger}
                  />

                  {/* 주소 (선택) */}
                  <AddressSection
                    showPostcode={form.showPostcode}
                    postcodeRef={form.postcodeRef}
                    setShowPostcode={form.setShowPostcode}
                  />

                  {/* 문의 */}
                  <ContactSection />

                  {/* 관련 링크 */}
                  <LinkSection />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>

        <CloseConfirmModal
          open={form.showCloseConfirm}
          onOpenChange={form.setShowCloseConfirm}
          onConfirm={handleConfirmClose}
        />
      </Dialog>
    </FormProvider>
  );
};

// --- 분류 섹션 ---
const TypeSection = ({
  onTypeChange,
}: {
  onTypeChange: (type: CeremonyType) => void;
}) => {
  const { control } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="분류">
      <Controller
        control={control}
        name="ceremonyType"
        render={({ field }) => (
          <Tab
            variant="chip"
            value={field.value}
            onValueChange={(v) => onTypeChange(v as CeremonyType)}
          >
            <Tab.List>
              {CEREMONY_TYPES.map((type) => (
                <Tab.TabItem key={type} value={type}>
                  {type}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        )}
      />
    </FormSection>
  );
};

// --- 상세 분류 섹션 ---
const CategorySection = () => {
  const { control, register, watch } = useFormContext<CeremonyFormData>();
  const ceremonyType = watch('ceremonyType');
  const category = watch('category');

  if (!ceremonyType) return null;

  const categoryOptions = CATEGORY_MAP[ceremonyType as CeremonyType] ?? [];
  const isCustom = category === CUSTOM_VALUE;

  return (
    <FormSection title="상세 분류">
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Tab
            variant="chip"
            value={field.value}
            onValueChange={field.onChange}
          >
            <Tab.List className="flex-wrap">
              {categoryOptions.map((opt) => (
                <Tab.TabItem key={opt.value} value={opt.value}>
                  {opt.emoji ? (
                    <HStack gap="xs" className="items-center">
                      <span>{opt.emoji}</span>
                      <span>{opt.value}</span>
                    </HStack>
                  ) : (
                    (opt.label ?? opt.value)
                  )}
                </Tab.TabItem>
              ))}
            </Tab.List>
          </Tab>
        )}
      />

      {isCustom && (
        <Field>
          <TextInput
            {...register('customCategory')}
            placeholder={`${ceremonyType}를 입력해주세요.`}
            className="rounded-xl bg-white"
          />
        </Field>
      )}
    </FormSection>
  );
};

// --- 문의 섹션 ---
const ContactSection = () => {
  const { register } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="문의" optional>
      <Field>
        <TextInput
          {...register('phone')}
          placeholder="연락 가능한 전화번호를 입력해주세요."
          className="rounded-xl bg-white"
        />
      </Field>
    </FormSection>
  );
};

// --- 관련 링크 섹션 ---
const LinkSection = () => {
  const { register } = useFormContext<CeremonyFormData>();

  return (
    <FormSection title="관련 링크" optional>
      <Field>
        <TextInput
          {...register('relatedLink')}
          placeholder="URL을 입력해주세요."
          className="rounded-xl bg-white"
        />
      </Field>
    </FormSection>
  );
};
