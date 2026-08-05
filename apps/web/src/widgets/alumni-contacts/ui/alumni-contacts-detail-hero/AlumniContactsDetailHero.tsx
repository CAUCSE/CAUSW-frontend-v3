import { VStack } from '@causw/cds';

import {
  AlumniContactsBasicInfo,
  AlumniContactsDescription,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsHeroActions } from '../alumni-contacts-hero-actions';

interface AlumniContactsDetailHeroProps {
  alumniContactsDetail: GetAlumniContactsDetailResponseDto;
  isMine?: boolean;
}

export const AlumniContactsDetailHero = ({
  alumniContactsDetail,
  isMine,
}: AlumniContactsDetailHeroProps) => {
  return (
    <VStack className="bg-white md:rounded-t-lg md:border md:border-b-0 md:border-gray-200">
      <VStack gap="md" className="p-4 pt-2 md:px-5 md:pt-7" as="section">
        <VStack>
          <AlumniContactsBasicInfo
            name={alumniContactsDetail.name}
            admissionYear={alumniContactsDetail.admissionYear}
            academicStatus={alumniContactsDetail.academicStatus}
            departmentLabel={alumniContactsDetail.departmentDescription}
            profileImage={alumniContactsDetail.profileImage}
            isCoffeeChatAvailable={alumniContactsDetail.isCoffeeChatAvailable}
          />
          <AlumniContactsDescription
            description={alumniContactsDetail.description}
          />
        </VStack>
        <AlumniContactsHeroActions
          alumniContactsId={alumniContactsDetail.id}
          name={alumniContactsDetail.name}
          isCoffeeChatAvailable={alumniContactsDetail.isCoffeeChatAvailable}
          isPhoneNumberVisible={alumniContactsDetail.isPhoneNumberVisible}
          phoneNumber={alumniContactsDetail.phoneNumber}
          email={alumniContactsDetail.email}
          isMine={isMine}
        />
      </VStack>
    </VStack>
  );
};
