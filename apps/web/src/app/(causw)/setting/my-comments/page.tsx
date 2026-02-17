import { MyCommentsPage } from '@/_pages/setting';

type SearchParams = {
  view?: string;
};

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;

  return <MyCommentsPage searchParams={resolvedSearchParams} />;
};

export default Page;
