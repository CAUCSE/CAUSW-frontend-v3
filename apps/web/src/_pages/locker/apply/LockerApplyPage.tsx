import { LockerApplyModal } from '@/widgets/locker';

interface LockerApplyPageProps {
  locationId: string;
}

export const LockerApplyPage = ({ locationId }: LockerApplyPageProps) => {
  return <LockerApplyModal locationId={locationId} />;
};
