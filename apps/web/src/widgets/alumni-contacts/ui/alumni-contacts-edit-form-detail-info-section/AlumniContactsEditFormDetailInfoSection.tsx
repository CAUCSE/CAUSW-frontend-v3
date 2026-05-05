import { type RefObject } from 'react';

import { Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

import { AlumniContactsEditFormDetailInfoContent } from '../alumni-contacts-edit-form-detail-info-content';

interface AlumniContactsEditFormDetailInfoSectionProps {
  tabType: AlumniContactsDetailSectionTabType;
  idx: number;
  categoryRef: RefObject<HTMLSpanElement[]>;
}

export const AlumniContactsEditFormDetailInfoSection = ({
  tabType,
  idx,
  categoryRef,
}: AlumniContactsEditFormDetailInfoSectionProps) => {
  return (
    <VStack gap="none">
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
      <AlumniContactsEditFormDetailInfoContent tabType={tabType} />
    </VStack>
  );
};
