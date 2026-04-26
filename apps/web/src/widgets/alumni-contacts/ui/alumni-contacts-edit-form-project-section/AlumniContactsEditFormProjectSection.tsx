'use client';

import { VStack } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH } from '@/entities/alumni-contacts';

import { ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE } from '../../config';
import { useAlumniContactsEditFormProjectSection } from '../../model';
import { AlumniContactsProfileEntryAddDialog } from '../alumni-contacts-profile-entry-add-dialog';
import { AlumniContactsProfileEntryItem } from '../alumni-contacts-profile-entry-item';

export const AlumniContactsEditFormProjectSection = () => {
  const {
    fields,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddProject,
    handleClickDeleteProject,
  } = useAlumniContactsEditFormProjectSection();

  return (
    <VStack className="w-full pt-3">
      <VStack className="gap-5">
        {fields.map((field, idx) => (
          <AlumniContactsProfileEntryItem
            key={field.id}
            type={ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE.PROJECT}
            description={field.description}
            startYear={field.startYear}
            startMonth={field.startMonth}
            endYear={field.endYear}
            endMonth={field.endMonth}
            onClickDelete={() => handleClickDeleteProject(idx)}
          />
        ))}
      </VStack>
      <AlumniContactsSingleFieldAddButton
        label="대표 프로젝트 추가"
        onClick={handleClickAddButton}
      />
      <AlumniContactsProfileEntryAddDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="대표 프로젝트 추가하기"
        ariaDescription="대표 프로젝트를 추가합니다."
        placeholder="대표 프로젝트를 입력해주세요."
        maxLength={ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.PROJECT_DESCRIPTION}
        toggleLabel="대표 프로젝트"
        onClickAddButton={handleClickAddProject}
      />
    </VStack>
  );
};
