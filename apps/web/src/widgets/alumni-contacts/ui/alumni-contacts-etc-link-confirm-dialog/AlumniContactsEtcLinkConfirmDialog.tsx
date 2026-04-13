import { Button, Dialog, HStack, Text } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  ALUMNI_CONTACTS_SNS_TYPE_LABEL,
  AlumniContactsSnsIcon,
} from '@/entities/alumni-contacts';

interface AlumniContactsEtcLinkConfirmDialogProps {
  socialLink: string;
}

export const AlumniContactsEtcLinkConfirmDialog = ({
  socialLink,
}: AlumniContactsEtcLinkConfirmDialogProps) => {
  const snsType = ALUMNI_CONTACTS_SNS_TYPE.ETC;

  const handleOpenEtcLink = () => {
    window.open(socialLink, '_blank');
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className="flex h-fit w-fit flex-col items-center gap-1.5 bg-transparent p-0 hover:bg-transparent!">
          <div className="flex size-15 items-center justify-center rounded-xl bg-gray-100">
            <AlumniContactsSnsIcon snsType={snsType} />
          </div>
          <Text typography="body-14-regular" textColor="gray-600">
            {ALUMNI_CONTACTS_SNS_TYPE_LABEL[snsType]}
          </Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <Text typography="subtitle-18-bold" textColor="gray-800">
            신뢰할 수 없는 링크입니다
          </Text>
        </Dialog.Title>
        <Text typography="body-14-regular" textColor="gray-600">
          <Text typography="body-14-regular" textColor="blue-500">
            {socialLink}
          </Text>
          로 이동하시겠습니까? 이동하시려면 확인 버튼을 눌러주세요.
        </Text>
        <Dialog.Footer>
          <HStack gap="md" className="justify-end">
            <Dialog.Close asChild>
              <Button color="gray">취소</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button color="red" onClick={handleOpenEtcLink}>
                확인
              </Button>
            </Dialog.Close>
          </HStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
