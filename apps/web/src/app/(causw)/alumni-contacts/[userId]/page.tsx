import { AlumniDetailPage } from '@/_pages/alumni-contacts';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default function Page({ params }: PageProps) {
  // _pages/alumni-contacts/index.tsx (또는 AlumniDetailPage)에서 만든 컴포넌트를 호출
  return <AlumniDetailPage params={params} />;
}
