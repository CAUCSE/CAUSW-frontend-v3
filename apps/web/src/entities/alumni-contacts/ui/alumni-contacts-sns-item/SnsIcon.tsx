import {
  GithubLogo,
  InstagramLogo,
  Link as LinkIcon,
  LinkedInLogo,
  TistoryLogo,
} from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  type AlumniContactsSnsType,
} from '../../config';

interface SnsIconProps {
  snsType: AlumniContactsSnsType;
}

export const SnsIcon = ({ snsType }: SnsIconProps) => {
  switch (snsType) {
    case ALUMNI_CONTACTS_SNS_TYPE.INSTAGRAM:
      return <InstagramLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.GITHUB:
      return <GithubLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.TISTORY:
      return <TistoryLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.LINKEDIN:
      return <LinkedInLogo size={24} />;
    default:
      return <LinkIcon size={24} />;
  }
};
