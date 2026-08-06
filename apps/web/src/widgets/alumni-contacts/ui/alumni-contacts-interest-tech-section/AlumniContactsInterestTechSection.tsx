import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';

interface AlumniContactsInterestTechSectionProps {
  userInterestTech: GetAlumniContactsDetailResponseDto['userInterestTech'];
}

export const AlumniContactsInterestTechSection = ({
  userInterestTech,
}: AlumniContactsInterestTechSectionProps) => {
  if (userInterestTech.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }

  return (
    <HStack gap="sm" className="overflow-x-auto">
      {userInterestTech.map((tech) => (
        <Chip key={tech} size="sm" color="lightgray" className="px-2.5">
          {tech}
        </Chip>
      ))}
    </HStack>
  );
};
