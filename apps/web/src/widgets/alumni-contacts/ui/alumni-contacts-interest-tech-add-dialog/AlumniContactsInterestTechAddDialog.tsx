'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';

import { useAlumniContactsSingleFieldDialog } from '../../model';
import { AlumniContactsSingleFieldAddDialog } from '../alumni-contacts-single-field-add-dialog';

export const AlumniContactsInterestTechAddDialog = () => {
  const {
    isOpen,
    newFieldValue: newInterestTech,
    addButtonRef,
    handleClickDialogTrigger,
    handleOpenChange,
    handleNewFieldValueChange: handleInterestTechChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleInitialFocus,
    handleClickAddFieldValueButton: handleClickAddInterestTechButton,
  } = useAlumniContactsSingleFieldDialog({
    fieldName: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_TECH,
  });

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="관심 기술 추가"
        onClick={handleClickDialogTrigger}
      />
      <AlumniContactsSingleFieldAddDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="관심 기술 추가"
        ariaDescription="관심 기술을 추가합니다."
        canConfirm={!!newInterestTech.trim()}
        onConfirm={handleClickAddInterestTechButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="관심 기술을 입력해주세요."
          className="bg-gray-100"
          onChange={handleInterestTechChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
          value={newInterestTech}
          ref={handleInitialFocus}
        />
      </AlumniContactsSingleFieldAddDialog>
    </>
  );
};
