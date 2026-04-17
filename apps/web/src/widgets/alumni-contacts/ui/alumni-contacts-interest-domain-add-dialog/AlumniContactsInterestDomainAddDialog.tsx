'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { useAlumniContactsInterestDomainAddDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

export const AlumniContactsInterestDomainAddDialog = () => {
  const {
    isOpen,
    newInterestDomain,
    addButtonRef,
    handleClickTrigger,
    handleOpenChange,
    handleInterestDomainChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  } = useAlumniContactsInterestDomainAddDialog();

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="관심 도메인 추가"
        onClick={handleClickTrigger}
      />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="관심 도메인 추가"
        ariaDescription="관심 도메인을 추가합니다."
        canConfirm={!!newInterestDomain.trim()}
        onConfirm={handleClickAddButton}
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
        />
      </AlumniContactsSingleFieldDialog>
    </>
  );
};
