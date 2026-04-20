import { ALUMNI_CONTACTS_SNS_TYPE } from '../config';

export const getAlumniContactSnsType = (socialLink: string) => {
  if (socialLink.includes('tistory.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.TISTORY;
  }

  if (socialLink.includes('blog.naver.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.NAVER_BLOG;
  }

  if (socialLink.includes('medium.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.MEDIUM;
  }

  if (socialLink.includes('github.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.GITHUB;
  }

  if (socialLink.includes('linkedin.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.LINKEDIN;
  }

  if (socialLink.includes('velog.io')) {
    return ALUMNI_CONTACTS_SNS_TYPE.VELOG;
  }

  if (socialLink.includes('instagram.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.INSTAGRAM;
  }

  if (socialLink.includes('open.kakao.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.KAKAOTALK;
  }

  if (socialLink.includes('story.kakao.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.KAKAO_STORY;
  }

  if (socialLink.includes('facebook.com') || socialLink.includes('fb.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.FACEBOOK;
  }

  if (socialLink.includes('band.us')) {
    return ALUMNI_CONTACTS_SNS_TYPE.NAVER_BAND;
  }

  if (socialLink.includes('cafe.naver.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.NAVER_CAFE;
  }

  if (socialLink.includes('cafe.daum.net')) {
    return ALUMNI_CONTACTS_SNS_TYPE.DAUM_CAFE;
  }

  if (socialLink.includes('notion.so') || socialLink.includes('notion.site')) {
    return ALUMNI_CONTACTS_SNS_TYPE.NOTION;
  }

  if (socialLink.includes('youtube.com') || socialLink.includes('youtu.be')) {
    return ALUMNI_CONTACTS_SNS_TYPE.YOUTUBE;
  }

  if (socialLink.includes('linktr.ee') || socialLink.includes('linktree.com')) {
    return ALUMNI_CONTACTS_SNS_TYPE.LINKTREE;
  }

  if (socialLink.includes('myslice.is')) {
    return ALUMNI_CONTACTS_SNS_TYPE.SLICE;
  }

  if (socialLink.includes('hihello.me')) {
    return ALUMNI_CONTACTS_SNS_TYPE.HIHELLO;
  }

  if (socialLink.includes('blinq.me')) {
    return ALUMNI_CONTACTS_SNS_TYPE.BLINQ;
  }

  if (socialLink.includes('popl.co')) {
    return ALUMNI_CONTACTS_SNS_TYPE.POPL;
  }

  return ALUMNI_CONTACTS_SNS_TYPE.ETC;
};
