import { VStack } from '@causw/cds';

import {
  AlumniContactsBasicInfo,
  AlumniContactsDescription,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsContactActions } from '../alumni-contacts-contact-actions';

interface AlumniContactsDetailHeroProps {
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
}

export const AlumniContactsDetailHero = ({
  alumniContactsDetail,
}: AlumniContactsDetailHeroProps) => {
  return (
    <VStack gap="lg" className="my-6 w-full shrink-0 px-6" as="section">
      <VStack>
        <AlumniContactsBasicInfo
          name={alumniContactsDetail.name}
          admissionYear={alumniContactsDetail.admissionYear}
          academicStatus={alumniContactsDetail.academicStatus}
          profileImage={alumniContactsDetail.profileImage}
        />
        <AlumniContactsDescription
          description={alumniContactsDetail.description}
        />
      </VStack>
      <AlumniContactsContactActions
        isPhoneNumberVisible={alumniContactsDetail.isPhoneNumberVisible}
        phoneNumber={alumniContactsDetail.phoneNumber}
        email={alumniContactsDetail.email}
      />
    </VStack>
  );
};
