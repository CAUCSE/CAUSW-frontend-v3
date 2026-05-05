import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE,
  type AlumniContactsDetailSectionTabType,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsCareerSection } from '../alumni-contacts-career-section';
import { AlumniContactsInterestDomainSection } from '../alumni-contacts-interest-domain-section';
import { AlumniContactsInterestTechSection } from '../alumni-contacts-interest-tech-section';
import { AlumniContactProjectSection } from '../alumni-contacts-project-section';
import { AlumniContactsSnsSection } from '../alumni-contacts-sns-section';
import { AlumniContactsTechStackSection } from '../alumni-contacts-tech-stack-section';

interface AlumniContactsDetailInfoContentProps {
  tabType: AlumniContactsDetailSectionTabType;
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
}

export const AlumniContactsDetailInfoContent = ({
  tabType,
  alumniContactsDetail,
}: AlumniContactsDetailInfoContentProps) => {
  switch (tabType) {
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.SNS:
      return (
        <AlumniContactsSnsSection
          socialLinks={alumniContactsDetail.socialLinks}
        />
      );
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.TECH_STACK:
      return (
        <AlumniContactsTechStackSection
          userTechStack={alumniContactsDetail.userTechStack}
        />
      );
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.CAREER:
      return (
        <AlumniContactsCareerSection
          userCareer={alumniContactsDetail.userCareer}
        />
      );
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.PROJECT:
      return (
        <AlumniContactProjectSection
          userProject={alumniContactsDetail.userProject}
        />
      );
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.INTEREST_TECH:
      return (
        <AlumniContactsInterestTechSection
          userInterestTech={alumniContactsDetail.userInterestTech}
        />
      );
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.INTEREST_DOMAIN:
      return (
        <AlumniContactsInterestDomainSection
          userInterestDomain={alumniContactsDetail.userInterestDomain}
        />
      );
    default:
      return null;
  }
};
