import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

interface AlumniContactsInterestTechSectionProps {
  userInterestTech: GetAlumniContactsDetailResponseDto['userInterestTech'];
}

export const AlumniContactsInterestTechSection = ({
  userInterestTech,
}: AlumniContactsInterestTechSectionProps) => {
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
