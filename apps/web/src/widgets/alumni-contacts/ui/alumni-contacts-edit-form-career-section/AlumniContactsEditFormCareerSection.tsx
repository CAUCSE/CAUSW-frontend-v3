'use client';

import { VStack } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH } from '@/entities/alumni-contacts';

import { ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE } from '../../config';
import { useAlumniContactsEditFormCareerSection } from '../../model';
import { AlumniContactsProfileEntryAddDialog } from '../alumni-contacts-profile-entry-add-dialog';
import { AlumniContactsProfileEntryItem } from '../alumni-contacts-profile-entry-item';

export const AlumniContactsEditFormCareerSection = () => {
  const {
    fields,
    isOpen,
    handleClickAddButton,
    handleOpenChange,
    handleClickAddCareer,
    handleClickDeleteCareer,
  } = useAlumniContactsEditFormCareerSection();

  return (
    <VStack className="w-full pt-3">
      <VStack className="gap-5">
        {fields.map((field, idx) => (
          <AlumniContactsProfileEntryItem
            key={field.id}
            type={ALUMNI_CONTACTS_PROFILE_ENTRY_TYPE.CAREER}
            description={field.description}
            startYear={field.startYear}
            startMonth={field.startMonth}
            endYear={field.endYear}
            endMonth={field.endMonth}
            onClickDelete={() => handleClickDeleteCareer(idx)}
          />
        ))}
      </VStack>
      <AlumniContactsSingleFieldAddButton
        label="경력 사항 추가"
        onClick={handleClickAddButton}
      />
      <AlumniContactsProfileEntryAddDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="경력 추가하기"
        ariaDescription="경력 사항을 추가합니다."
        maxLength={ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.CAREER_DESCRIPTION}
        placeholder="경력 사항을 입력해주세요."
        toggleLabel="재직 중"
        onClickAddButton={handleClickAddCareer}
      />
    </VStack>
  );
};
