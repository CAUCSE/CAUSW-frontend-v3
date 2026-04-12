'use client';

import React from 'react';

import { VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { useAlumniContactsDetailSection } from '../../model';
import { AlumniContactsDetailInfoSection } from '../alumni-contacts-detail-info-section';
import { AlumniContactsDetailSectionTabs } from '../alumni-contacts-detail-section-tabs/AlumniContactsDetailSectionTabs';

interface AlumniContactsDetailSectionProps {
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
}

export const AlumniContactsDetailSection = ({
  alumniContactsDetail,
}: AlumniContactsDetailSectionProps) => {
  console.log(alumniContactsDetail);

  const { selectedTab, categoryRef, handleClickCategoryTab } =
    useAlumniContactsDetailSection();

  return (
    <VStack as="section" className="flex-1 gap-7 bg-white px-6 py-4">
      <AlumniContactsDetailSectionTabs
        selectedTab={selectedTab}
        handleClickCategoryTab={handleClickCategoryTab}
      />
      <VStack className="gap-8">
        {Object.keys(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL).map(
          (key, idx) => (
            <React.Fragment key={key}>
              <AlumniContactsDetailInfoSection
                tabType={
                  key as keyof typeof ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL
                }
                idx={idx}
                categoryRef={categoryRef}
                alumniContactsDetail={alumniContactsDetail}
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
