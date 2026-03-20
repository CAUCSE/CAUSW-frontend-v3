import { BottomSheet, CTAButton } from '@causw/cds';

import { AlumniContactsAcademicFilterSheetModalMain } from '@/widgets/alumni-contacts';

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
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content
        className="items-center p-6"
        aria-describedby={undefined}
      >
        <BottomSheet.Header
          title="동문 수첩 학번, 재학 상태 필터 선택 바텀시트"
          className="sr-only"
        />
        <BottomSheet.Body maxHeight={356} className="my-6">
          <AlumniContactsAcademicFilterSheetModalMain />
        </BottomSheet.Body>
        <BottomSheet.Footer className="p-0">
          <CTAButton
            color="dark"
            className="typo-body-15-semibold"
            fullWidth
            onClick={onApply}
          >
            적용하기
          </CTAButton>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
