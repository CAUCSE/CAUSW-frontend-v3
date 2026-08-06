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
      typography="body-15-regular"
      textColor="gray-700"
      className="whitespace-pre-wrap"
    >
      {description}
    </Text>
  );
};
