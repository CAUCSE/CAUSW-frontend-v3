'use client';

import { FormProvider } from 'react-hook-form';

import { Dialog } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import { ActionHeader } from '@/shared/ui/ActionHeader';

import { useCeremonyForm } from '../model';

import { AddressSection } from './AddressSection';
import { AdmissionYearSection } from './AdmissionYearSection';
import { CategorySection } from './CategorySection';
import { CloseConfirmModal } from './CloseConfirmModal';
import { ContactSection } from './ContactSection';
import { ContentSection } from './ContentSection';
import { DateTimeSection } from './DateTimeSection';
import { LinkSection } from './LinkSection';
import { RelationshipSection } from './RelationshipSection';
import { TypeSection } from './TypeSection';

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
