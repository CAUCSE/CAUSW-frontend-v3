import { LockerApplyPage } from '@/_pages/locker/apply';

interface PageProps {
  params: Promise<{ locationId: string }>;
}
export default async function Page({ params }: PageProps) {
  const { locationId } = await params;

  return <LockerApplyPage locationId={locationId} />;
}
