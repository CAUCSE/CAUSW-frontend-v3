import { LockerApplyModalWrapper } from '@/widgets/locker';

interface LockerApplyPageProps {
  locationId: string;
}

export const LockerApplyPage = ({ locationId }: LockerApplyPageProps) => {
  return <LockerApplyModalWrapper locationId={locationId} />;
};
