import { AlumniContactsDetailPage } from '@/_pages/alumni-contacts';

export default async function Page({
  params,
}: {
  params: Promise<{ alumniContactsId: string }>;
}) {
  const { alumniContactsId } = await params;
  return <AlumniContactsDetailPage alumniContactsId={alumniContactsId} />;
}
