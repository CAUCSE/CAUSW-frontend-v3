'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { useAlumniContactsInterestTechAddDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

export const AlumniContactsInterestTechAddDialog = () => {
  const {
    isOpen,
    newInterestTech,
    addButtonRef,
    handleClickTrigger,
    handleOpenChange,
    handleInterestTechChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  } = useAlumniContactsInterestTechAddDialog();

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="관심 기술 추가"
        onClick={handleClickTrigger}
      />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="관심 기술 추가"
        canConfirm={!!newInterestTech.trim()}
        onConfirm={handleClickAddButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="관심 기술을 입력해주세요."
          className="bg-gray-100"
          onChange={handleInterestTechChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleEnterPress}
        />
      </AlumniContactsSingleFieldDialog>
    </>
  );
};
