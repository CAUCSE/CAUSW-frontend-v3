'use client';

import { Button, Eye, EyeOff, Text } from '@causw/cds';

import { useAlumniContactsContactVisibilityToggleButton } from '../../model';

export const AlumniContactsContactVisibiltyToggleButton = () => {
  const { isPhoneNumberVisible, handleClickButton } =
    useAlumniContactsContactVisibilityToggleButton();

  const iconProps = {
    size: 16,
    color: 'gray-300',
  } as const;

  const VisibilityIcon = isPhoneNumberVisible ? (
    <Eye {...iconProps} />
  ) : (
    <EyeOff {...iconProps} />
  );

  return (
    <Button
      color="gray"
      className="items-center px-3 py-2"
      onClick={handleClickButton}
      type="button"
    >
      {VisibilityIcon}
      <Text typography="body-14-semibold" textColor="gray-500">
        연락처 {isPhoneNumberVisible ? '공개' : '비공개'}
      </Text>
    </Button>
  );
};
