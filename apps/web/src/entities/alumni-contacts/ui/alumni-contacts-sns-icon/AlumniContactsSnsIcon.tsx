import {
  BlindqLogo,
  DaumCafeLogo,
  FacebookLogo,
  GithubLogo,
  HiHelloLogo,
  InstagramLogo,
  KakaoStoryLogo,
  KakaoTalkLogo,
  Link as LinkIcon,
  LinkTreeLogo,
  LinkedInLogo,
  MediumLogo,
  NaverBandLogo,
  NaverBlogLogo,
  NaverCafeLogo,
  NotionLogo,
  PoplLogo,
  SliceLogo,
  TistoryLogo,
  VelogLogo,
  YoutubeLogo,
} from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  type AlumniContactsSnsType,
} from '../../config';

interface AlumniContactsSnsIconProps {
  snsType: AlumniContactsSnsType;
}

export const AlumniContactsSnsIcon = ({
  snsType,
}: AlumniContactsSnsIconProps) => {
  switch (snsType) {
    case ALUMNI_CONTACTS_SNS_TYPE.TISTORY:
      return <TistoryLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.NAVER_BLOG:
      return <NaverBlogLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.MEDIUM:
      return <MediumLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.GITHUB:
      return <GithubLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.LINKEDIN:
      return <LinkedInLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.VELOG:
      return <VelogLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.INSTAGRAM:
      return <InstagramLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.KAKAOTALK:
      return <KakaoTalkLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.KAKAO_STORY:
      return <KakaoStoryLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.FACEBOOK:
      return <FacebookLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.NAVER_BAND:
      return <NaverBandLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.NAVER_CAFE:
      return <NaverCafeLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.DAUM_CAFE:
      return <DaumCafeLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.NOTION:
      return <NotionLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.YOUTUBE:
      return <YoutubeLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.LINKTREE:
      return <LinkTreeLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.SLICE:
      return <SliceLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.HIHELLO:
      return <HiHelloLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.BLINQ:
      return <BlindqLogo size={24} />;
    case ALUMNI_CONTACTS_SNS_TYPE.POPL:
      return <PoplLogo size={24} />;
    default:
      return <LinkIcon size={24} />;
  }
};
