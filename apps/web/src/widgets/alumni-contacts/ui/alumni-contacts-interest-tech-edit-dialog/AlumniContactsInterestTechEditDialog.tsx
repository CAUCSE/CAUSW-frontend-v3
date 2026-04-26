'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsFieldEditButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';

import { useAlumniContactsSingleFieldEditDialog } from '../../model';
import { AlumniContactsSingleFieldEditDialog } from '../alumni-contacts-single-field-edit-dialog';

interface AlumniContactsInterestTechEditDialogProps {
  interestTechIndex: number;
}

export const AlumniContactsInterestTechEditDialog = ({
  interestTechIndex,
}: AlumniContactsInterestTechEditDialogProps) => {
  const {
    isOpen,
    currentFieldValue: currentInterestTech,
    saveButtonRef,
    handleInitialFocus,
    handleClickDialogTrigger,
    handleOpenChange,
    handleFieldValueChange: handleCurrentInterestTechChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickSaveButton,
    handleClickDeleteButton,
  } = useAlumniContactsSingleFieldEditDialog({
    fieldName: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
    fieldItemIndex: interestTechIndex,
  });

  return (
    <>
      <AlumniContactsFieldEditButton
        iconSize={12}
        iconColor="gray-600"
        onClick={handleClickDialogTrigger}
        ariaLabel="관심 기술 수정하기"
      />
      <AlumniContactsSingleFieldEditDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="관심 기술 수정"
        ariaDescription="관심 기술을 수정합니다."
        canSave={!!currentInterestTech.trim()}
        onSave={handleClickSaveButton}
        saveButtonRef={saveButtonRef}
        deleteButtonLabel="관심 기술 삭제"
        onDelete={handleClickDeleteButton}
      >
        <TextInput
          placeholder="관심 기술을 입력해주세요."
          className="bg-gray-100"
          onChange={handleCurrentInterestTechChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
          value={currentInterestTech}
          ref={handleInitialFocus}
        />
      </AlumniContactsSingleFieldEditDialog>
    </>
  );
};
