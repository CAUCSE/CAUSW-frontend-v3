import { type RefObject } from 'react';

import { Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsCareerSection } from '../alumni-contacts-career-section';
import { AlumniContactsInterestDomainSection } from '../alumni-contacts-interest-domain-section';
import { AlumniContactsInterestTechSection } from '../alumni-contacts-interest-tech-section';
import { AlumniContactProjectSection } from '../alumni-contacts-project-section';
import { AlumniContactsSnsSection } from '../alumni-contacts-sns-section';
import { AlumniContactsTechStackSection } from '../alumni-contacts-tech-stack-section';

type AlumniContactDetailTabKey =
  keyof typeof ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL;

interface AlumniContactsDetailInfoContentProps {
  tabType: AlumniContactDetailTabKey;
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
}

const AlumniContactsDetailInfoContent = ({
  tabType,
  alumniContactsDetail,
}: AlumniContactsDetailInfoContentProps) => {
  switch (tabType) {
    case 'sns':
      return (
        <AlumniContactsSnsSection
          socialLinks={alumniContactsDetail.socialLinks}
        />
      );
    case 'techStack':
      return (
        <AlumniContactsTechStackSection
          userTechStack={alumniContactsDetail.userTechStack}
        />
      );
    case 'career':
      return (
        <AlumniContactsCareerSection
          userCareer={alumniContactsDetail.userCareer}
        />
      );
    case 'project':
      return (
        <AlumniContactProjectSection
          userProject={alumniContactsDetail.userProject}
        />
      );
    case 'interestTech':
      return (
        <AlumniContactsInterestTechSection
          userInterestTech={alumniContactsDetail.userInterestTech}
        />
      );
    case 'interestDomain':
      return (
        <AlumniContactsInterestDomainSection
          userInterestDomain={alumniContactsDetail.userInterestDomain}
        />
      );
    default:
      return null;
  }
};

interface AlumniContactsDetailInfoSectionProps {
  tabType: AlumniContactDetailTabKey;
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
