import { Button, Close, HStack, Text, VStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE_LABEL,
  AlumniContactsSnsIcon,
  getAlumniContactSnsType,
} from '@/entities/alumni-contacts';

interface AlumniContactsEditFormSnsItemProps {
  socialLink: string;
  onClickDelete: () => void;
}

export const AlumniContactsEditFormSnsItem = ({
  socialLink,
  onClickDelete,
}: AlumniContactsEditFormSnsItemProps) => {
  const snsType = getAlumniContactSnsType(socialLink);
  return (
    <VStack className="w-19 shrink-0 items-center gap-1.5 px-2">
      <HStack className="relative size-15 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-200">
        <AlumniContactsSnsIcon snsType={snsType} />
        <Button
          type="button"
          className="absolute top-[-4.5px] right-[-4.5px] z-1 size-4.5 rounded-full bg-gray-500 p-0 hover:bg-gray-600!"
          onClick={onClickDelete}
        >
          <Close color="gray-200" size={14} />
        </Button>
      </HStack>
      <Text
        typography="body-14-regular"
        textColor="gray-600"
        className="block w-full min-w-0 truncate text-center"
      >
        {ALUMNI_CONTACTS_SNS_TYPE_LABEL[snsType]}
      </Text>
    </VStack>
  );
};
