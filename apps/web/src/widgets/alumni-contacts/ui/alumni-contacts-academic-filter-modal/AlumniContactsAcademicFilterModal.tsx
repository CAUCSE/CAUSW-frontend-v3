import { Modal } from '@causw/cds';

import { AlumniContactsAcademicFilterSheetModalMain } from '@/widgets/alumni-contacts/ui/alumni-contacts-academic-filter-sheet-modal-main';

interface AlumniContactsAcademicFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: () => void;
}

export const AlumniContactsAcademicFilterModal = ({
  open,
  onOpenChange,
  onApply,
}: AlumniContactsAcademicFilterModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Title className="sr-only w-0">
        동문 수첩 학번, 재학 상태 필터 선택 모달창
      </Modal.Title>
      <Modal.Content className="items-start p-6">
        <AlumniContactsAcademicFilterSheetModalMain />
        <Modal.Footer className="p-0">
          <Modal.Close asChild>
            <Modal.ActionButton
              color="dark"
              className="typo-body-15-semibold"
              onClick={onApply}
            >
              적용하기
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
