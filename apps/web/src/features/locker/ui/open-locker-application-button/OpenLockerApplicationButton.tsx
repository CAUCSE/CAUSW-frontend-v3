'use client';

import { useRouter } from 'next/navigation';

import { CTAButton } from '@causw/cds';

import { type GetLockerLocationsResponseDto } from '@/entities/locker';

interface OpenLockerApplicationButtonProps {
  lockerLocationId: GetLockerLocationsResponseDto['floors'][number]['locationId'];
}

export const OpenLockerApplicationButton = ({
  lockerLocationId,
}: OpenLockerApplicationButtonProps) => {
  const router = useRouter();

  const handleClickOpenLockerApplication = () => {
    router.push(`/locker/${lockerLocationId}`);
  };

  return (
    <CTAButton
      color="blue"
      className="w-full"
      onClick={handleClickOpenLockerApplication}
    >
      사물함 신청하기
    </CTAButton>
  );
};
