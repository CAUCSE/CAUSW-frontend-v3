'use client';

import { TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { useAlumniContactsSnsAddDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

export const AlumniContactsSnsAddDialog = () => {
  const {
    isOpen,
    newSocialLink,
    addButtonRef,
    handleClickTrigger,
    canAdd,
    handleNewSocialLinkChange,
    handleOpenChange,
    handleEnterPress,
    handleClickAddButton,
  } = useAlumniContactsSnsAddDialog();

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="SNS 추가"
        onClick={handleClickTrigger}
        disabled={!canAdd}
      />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="링크 추가하기"
        ariaDescription="SNS 링크를 추가합니다."
        canConfirm={!!newSocialLink.trim()}
        onConfirm={handleClickAddButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="사이트 URL을 입력해주세요."
          className="bg-gray-100"
          onChange={handleNewSocialLinkChange}
          onKeyDown={handleEnterPress}
          value={newSocialLink}
        />
      </AlumniContactsSingleFieldDialog>
    </>
  );
};
