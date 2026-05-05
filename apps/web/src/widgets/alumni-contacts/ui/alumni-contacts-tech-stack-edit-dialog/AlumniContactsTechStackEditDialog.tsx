'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsFieldEditButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';

import { useAlumniContactsSingleFieldEditDialog } from '../../model';
import { AlumniContactsSingleFieldEditDialog } from '../alumni-contacts-single-field-edit-dialog';

interface AlumniContactsTechStackEditDialogProps {
  techStackIndex: number;
}

export const AlumniContactsTechStackEditDialog = ({
  techStackIndex,
}: AlumniContactsTechStackEditDialogProps) => {
  const {
    isOpen,
    currentFieldValue: currentTechStack,
    saveButtonRef,
    handleInitialFocus,
    handleClickDialogTrigger,
    handleOpenChange,
    handleFieldValueChange: handleCurrentTechStackChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickSaveButton,
    handleClickDeleteButton,
  } = useAlumniContactsSingleFieldEditDialog({
    fieldName: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
    fieldItemIndex: techStackIndex,
  });

  return (
    <>
      <AlumniContactsFieldEditButton
        iconSize={12}
        iconColor="gray-600"
        onClick={handleClickDialogTrigger}
        ariaLabel="기술스택 수정하기"
      />
      <AlumniContactsSingleFieldEditDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="기술스택 수정"
        ariaDescription="기술스택을 수정합니다."
        canSave={!!currentTechStack.trim()}
        onSave={handleClickSaveButton}
        saveButtonRef={saveButtonRef}
        deleteButtonLabel="기술 스택 삭제"
        onDelete={handleClickDeleteButton}
      >
        <TextInput
          placeholder="기술스택을 입력해주세요."
          className="bg-gray-100"
          onChange={handleCurrentTechStackChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
          value={currentTechStack}
          ref={handleInitialFocus}
        />
      </AlumniContactsSingleFieldEditDialog>
    </>
  );
};
