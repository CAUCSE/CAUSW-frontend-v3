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
    userProject,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddProject,
  } = useAlumniContactsEditFormProjectSection();

  return (
    <VStack className="w-full pt-3">
      <VStack className="gap-5">
        {userProject.map((project, idx) => (
          <AlumniContactsProfileEntryItem
            key={project.id ?? idx}
            type={ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE.USER_PROJECT}
            description={project.description}
            startYear={project.startYear}
            startMonth={project.startMonth}
            endYear={project.endYear}
            endMonth={project.endMonth}
            fieldIndex={idx}
            maxLength={ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.PROJECT_DESCRIPTION}
            title="대표 프로젝트 수정하기"
            ariaDescription="대표 프로젝트를 수정합니다."
            placeholder="대표 프로젝트를 입력해주세요."
            deleteButtonLabel="프로젝트 삭제"
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
