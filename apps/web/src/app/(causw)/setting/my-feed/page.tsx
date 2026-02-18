import { MyFeedPage } from '@/_pages/setting';

type SearchParams = {
  view?: string;
  mode?: string;
};

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;

  return <MyFeedPage searchParams={resolvedSearchParams} />;
};

export default Page;
