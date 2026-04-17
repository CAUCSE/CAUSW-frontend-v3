import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

import { AlumniContactsEditFormCareerSection } from '../alumni-contacts-edit-form-career-section';
import { AlumniContactsEditFormInterestDomainSection } from '../alumni-contacts-edit-form-interest-domain-section';
import { AlumniContactsEditFormInterestTechSection } from '../alumni-contacts-edit-form-interest-tech-section';
import { AlumniContactsEditFormSnsSection } from '../alumni-contacts-edit-form-sns-section';
import { AlumniContactsEditFormTechStackSection } from '../alumni-contacts-edit-form-tech-stack-section';

interface AlumniContactsEditFormDetailInfoContentProps {
  tabType: AlumniContactsDetailSectionTabType;
}

export const AlumniContactsEditFormDetailInfoContent = ({
  tabType,
}: AlumniContactsEditFormDetailInfoContentProps) => {
  switch (tabType) {
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.SNS:
      return <AlumniContactsEditFormSnsSection />;
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.TECH_STACK:
      return <AlumniContactsEditFormTechStackSection />;
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.CAREER:
      return <AlumniContactsEditFormCareerSection />;
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.PROJECT:
      return null;
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.INTEREST_TECH:
      return <AlumniContactsEditFormInterestTechSection />;
    case ALUMNI_CONTACTS_DETAIL_SECTION_TAB_TYPE.INTEREST_DOMAIN:
      return <AlumniContactsEditFormInterestDomainSection />;
    default:
      return null;
  }
};
