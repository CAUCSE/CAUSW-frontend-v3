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
        <Chip key={tech} size="md" color="lightgray">
          {tech}
        </Chip>
      ))}
    </HStack>
  );
};
