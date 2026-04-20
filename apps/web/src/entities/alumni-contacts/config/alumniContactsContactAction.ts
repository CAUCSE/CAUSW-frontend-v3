import { type ValueOf } from '@/shared/lib';

export const ALUMNI_CONTACTS_CONTACT_ACTION_TYPE = {
  call: 'call',
  message: 'message',
  email: 'email',
};

export type AlumniContactsContactActionType = ValueOf<
  typeof ALUMNI_CONTACTS_CONTACT_ACTION_TYPE
>;

export const ALUMNI_CONTACTS_CONTACT_ACTION = {
  [ALUMNI_CONTACTS_CONTACT_ACTION_TYPE.call]: {
    copySuccessText: '전화번호가 복사되었습니다.',
    copyErrorText: '전화번호 복사에 실패했습니다.',
    mobileUrl: 'tel:',
  },
  [ALUMNI_CONTACTS_CONTACT_ACTION_TYPE.message]: {
    copySuccessText: '전화번호가 복사되었습니다.',
    copyErrorText: '전화번호 복사에 실패했습니다.',
    mobileUrl: 'sms:',
  },
  [ALUMNI_CONTACTS_CONTACT_ACTION_TYPE.email]: {
    copySuccessText: '이메일이 복사되었습니다.',
    copyErrorText: '이메일 복사에 실패했습니다.',
    mobileUrl: 'mailto:',
  },
};
