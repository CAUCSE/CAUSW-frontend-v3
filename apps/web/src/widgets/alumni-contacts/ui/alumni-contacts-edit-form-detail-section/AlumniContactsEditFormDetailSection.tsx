'use client';

import React from 'react';

import { VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

import { useAlumniContactsDetailSection } from '../../model';
import { AlumniContactsDetailSectionTabs } from '../alumni-contacts-detail-section-tabs';
import { AlumniContactsEditFormDetailInfoSection } from '../alumni-contacts-edit-form-detail-info-section';

export const AlumniContactsEditFormDetailSection = () => {
  const { selectedTab, categoryRef, handleClickCategoryTab } =
    useAlumniContactsDetailSection();

  return (
    <VStack className="grow bg-white px-6 py-4 md:rounded-b-lg">
      <AlumniContactsDetailSectionTabs
        selectedTab={selectedTab}
        handleClickCategoryTab={handleClickCategoryTab}
      />
      <VStack className="gap-8">
        {Object.keys(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL).map(
          (key, idx) => (
            <React.Fragment key={key}>
              <AlumniContactsEditFormDetailInfoSection
                tabType={key as AlumniContactsDetailSectionTabType}
                idx={idx}
                categoryRef={categoryRef}
              />
              {idx <
                Object.values(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL).length -
                  1 && <div className="h-px w-full bg-gray-100" />}
            </React.Fragment>
          ),
        )}
      </VStack>
    </VStack>
  );
};
