'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { useAlumniContactsTechStackAddDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

export const AlumniContactsTechStackAddDialog = () => {
  const {
    isOpen,
    newTechStack,
    addButtonRef,
    handleClickTrigger,
    handleTechStackChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
    handleOpenChange,
  } = useAlumniContactsTechStackAddDialog();

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="기술스택 추가"
        onClick={handleClickTrigger}
      />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="기술스택 추가"
        canConfirm={!!newTechStack.trim()}
        onConfirm={handleClickAddButton}
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
