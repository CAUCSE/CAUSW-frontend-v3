'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';

import { useAlumniContactsSingleFieldDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

export const AlumniContactsTechStackAddDialog = () => {
  const {
    isOpen,
    newFieldValue: newTechStack,
    addButtonRef,
    handleClickDialogTrigger,
    handleOpenChange,
    handleNewFieldValueChange: handleTechStackChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddFieldValueButton: handleClickAddTechStackButton,
  } = useAlumniContactsSingleFieldDialog({
    fieldName: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_TECH_STACK,
  });

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="기술스택 추가"
        onClick={handleClickDialogTrigger}
      />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="기술스택 추가"
        ariaDescription="기술스택을 추가합니다."
        canConfirm={!!newTechStack.trim()}
        onConfirm={handleClickAddTechStackButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="기술스택을 입력해주세요."
          className="bg-gray-100"
          onChange={handleTechStackChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
          value={newTechStack}
        />
      </AlumniContactsSingleFieldDialog>
    </>
  );
};
