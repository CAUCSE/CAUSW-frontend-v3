'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_FIELD } from '@/entities/alumni-contacts';

import { useAlumniContactsSingleFieldAddDialog } from '../../model';
import { AlumniContactsSingleFieldAddDialog } from '../alumni-contacts-single-field-add-dialog';

export const AlumniContactsInterestDomainAddDialog = () => {
  const {
    isOpen,
    newFieldValue: newInterestDomain,
    addButtonRef,
    handleClickDialogTrigger,
    handleOpenChange,
    handleNewFieldValueChange: handleInterestDomainChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleInitialFocus,
    handleClickAddFieldValueButton: handleClickAddInterestDomainButton,
  } = useAlumniContactsSingleFieldAddDialog({
    fieldName: ALUMNI_CONTACTS_EDIT_FORM_FIELD.USER_INTEREST_DOMAIN,
  });

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="관심 도메인 추가"
        onClick={handleClickDialogTrigger}
      />
      <AlumniContactsSingleFieldAddDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="관심 도메인 추가"
        ariaDescription="관심 도메인을 추가합니다."
        canConfirm={!!newInterestDomain.trim()}
        onConfirm={handleClickAddInterestDomainButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="관심 도메인을 입력해주세요."
          className="bg-gray-100"
          onChange={handleInterestDomainChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
          value={newInterestDomain}
          ref={handleInitialFocus}
        />
      </AlumniContactsSingleFieldAddDialog>
    </>
  );
};
