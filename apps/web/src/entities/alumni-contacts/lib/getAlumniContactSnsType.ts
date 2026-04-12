import { ALUMNI_CONTACTS_SNS_TYPE } from '../config';

export const getAlumniContactSnsType = (socialLink: string) => {
  if (socialLink.includes('instagram.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.INSTAGRAM;
  }

  if (socialLink.includes('github.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.GITHUB;
  }

  if (socialLink.includes('tistory.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.TISTORY;
  }
  if (socialLink.includes('linkedin.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.LINKEDIN;
  }

  return ALUMNI_CONTACTS_SNS_TYPE.ETC;
};
