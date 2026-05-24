import { Button, Dialog, HStack, Text } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  ALUMNI_CONTACTS_SNS_TYPE_LABEL,
  AlumniContactsSnsIcon,
  getValidAlumniContactsSocialLinkUrl,
} from '@/entities/alumni-contacts';

interface AlumniContactsEtcLinkConfirmDialogProps {
  socialLink: string;
}

export const AlumniContactsEtcLinkConfirmDialog = ({
  socialLink,
}: AlumniContactsEtcLinkConfirmDialogProps) => {
  const snsType = ALUMNI_CONTACTS_SNS_TYPE.ETC;
  const socialLinkUrl = getValidAlumniContactsSocialLinkUrl(socialLink);
  const isValidSocialLink = socialLinkUrl !== null;

  const handleOpenEtcLink = () => {
    if (!socialLinkUrl) {
      return;
    }

    window.open(socialLinkUrl.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className="flex h-fit w-19.5 flex-col items-center gap-1.5 bg-transparent p-0 hover:bg-transparent!">
          <div className="flex size-15 items-center justify-center rounded-xl bg-gray-100">
            <AlumniContactsSnsIcon snsType={snsType} />
          </div>
          <Text
            typography="body-14-regular"
            textColor="gray-600"
            className="block w-full min-w-0 truncate text-center"
          >
            {ALUMNI_CONTACTS_SNS_TYPE_LABEL[snsType]}
          </Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)]! max-w-80! gap-4 overflow-y-auto md:max-w-105!">
        <Dialog.Title>
          <Text typography="subtitle-18-bold" textColor="gray-800">
            {isValidSocialLink
              ? '신뢰할 수 없는 링크입니다'
              : '올바르지 않은 링크입니다'}
          </Text>
        </Dialog.Title>
        <Dialog.Description className="sr-only">
          기타 링크 이동 확인
        </Dialog.Description>
        <div className="min-w-0">
          <Text typography="body-14-regular" textColor="gray-600">
            {isValidSocialLink
              ? '다음 링크로 이동하시겠습니까?'
              : '이동할 수 없는 링크입니다.'}
          </Text>
          <Text
            typography="body-14-regular"
            textColor={isValidSocialLink ? 'blue-500' : 'red-400'}
            className="mt-2 block max-h-32 min-w-0 overflow-y-auto rounded-md bg-gray-50 px-3 py-2 break-all"
          >
            {socialLink}
          </Text>
          {isValidSocialLink && (
            <Text
              typography="body-14-regular"
              textColor="gray-600"
              className="mt-2 block break-keep"
            >
              이동하시려면 확인 버튼을 눌러주세요.
            </Text>
          )}
        </div>
        <Dialog.Footer>
          <HStack gap="sm" className="justify-end pt-2">
            <Dialog.Close asChild>
              <Button color="gray" className="h-11 flex-1 rounded-md">
                취소
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                color="red"
                onClick={handleOpenEtcLink}
                disabled={!isValidSocialLink}
                className="h-11 flex-1 rounded-md"
              >
                확인
              </Button>
            </Dialog.Close>
          </HStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
