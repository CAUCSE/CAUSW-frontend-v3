import { type RefObject } from 'react';

import { Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type AlumniContactsDetailSectionTabType,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoContent } from '../alumni-contacts-detail-info-content';

interface AlumniContactsDetailInfoSectionProps {
  tabType: AlumniContactsDetailSectionTabType;
  idx: number;
  categoryRef: RefObject<HTMLSpanElement[]>;
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
}

export const AlumniContactsDetailInfoSection = ({
  tabType,
  idx,
  categoryRef,
  alumniContactsDetail,
}: AlumniContactsDetailInfoSectionProps) => {
  return (
    <VStack className="gap-3">
      <Text
        id={tabType}
        ref={(el) => {
          if (el) {
            categoryRef.current[idx] = el;
          }
        }}
        typography="subtitle-18-bold"
        textColor="gray-700"
      >
        {ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL[tabType]}
      </Text>
      <AlumniContactsDetailInfoContent
        tabType={tabType}
        alumniContactsDetail={alumniContactsDetail}
      />
    </VStack>
  );
};
