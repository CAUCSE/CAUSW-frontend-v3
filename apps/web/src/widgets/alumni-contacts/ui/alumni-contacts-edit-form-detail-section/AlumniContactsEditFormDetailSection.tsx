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
    <VStack className="grow bg-white p-5 pt-0 pb-15 md:rounded-b-lg md:border md:border-t-0 md:border-gray-200 md:pb-5">
      <AlumniContactsDetailSectionTabs
        selectedTab={selectedTab}
        handleClickCategoryTab={handleClickCategoryTab}
      />
      <VStack className="gap-6">
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
