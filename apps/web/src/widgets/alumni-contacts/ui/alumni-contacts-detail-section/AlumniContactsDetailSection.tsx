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
  const { selectedTab, categoryRef, handleClickCategoryTab } =
    useAlumniContactsDetailSection();

  return (
    <VStack
      as="section"
      className="grow gap-5 bg-white p-5 pt-0 pb-15 md:rounded-b-lg md:border md:border-t-0 md:border-gray-200 md:pb-5"
    >
      <AlumniContactsDetailSectionTabs
        selectedTab={selectedTab}
        handleClickCategoryTab={handleClickCategoryTab}
      />
      <VStack className="gap-6">
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
