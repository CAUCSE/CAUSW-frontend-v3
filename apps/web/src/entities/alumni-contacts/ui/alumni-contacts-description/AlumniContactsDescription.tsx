import { Text } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '../../model';

interface AlumniContactsDescriptionProps {
  description: GetAlumniContactsDetailResponseDto['description'];
}

export const AlumniContactsDescription = ({
  description,
}: AlumniContactsDescriptionProps) => {
  return (
    <Text
      typography="body-16-regular"
      textColor="white"
      className="whitespace-pre-wrap"
    >
      {description}
    </Text>
  );
};
