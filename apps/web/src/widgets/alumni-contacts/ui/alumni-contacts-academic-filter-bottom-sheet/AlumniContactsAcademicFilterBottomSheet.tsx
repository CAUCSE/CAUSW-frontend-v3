import { BottomSheet, CTAButton, HStack } from '@causw/cds';

import { AlumniContactsAcademicFilterSheetModalMain } from '@/widgets/alumni-contacts/ui/alumni-contacts-academic-filter-sheet-modal-main';

interface AlumniContactsAcademicFilterBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: () => void;
}

export const AlumniContactsAcademicFilterBottomSheet = ({
  open,
  onOpenChange,
  onApply,
}: AlumniContactsAcademicFilterBottomSheetProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content
        className="items-center p-6"
        aria-describedby={undefined}
      >
        <BottomSheet.Header
          title="동문 수첩 필터 선택 바텀시트"
          className="sr-only"
        />
        <BottomSheet.Body maxHeight={460} className="my-6">
          <AlumniContactsAcademicFilterSheetModalMain />
        </BottomSheet.Body>
        <BottomSheet.Footer className="p-0">
          <HStack gap="sm">
            <CTAButton color="light" fullWidth onClick={handleClose}>
              닫기
            </CTAButton>
            <CTAButton color="dark" fullWidth onClick={onApply}>
              적용하기
            </CTAButton>
          </HStack>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
