import { RoutedMyActivityWidget } from '@/widgets/setting';

type SearchParams = {
  view?: string;
};

export const MyPostsPage = ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  return (
    <RoutedMyActivityWidget
      pathname="/setting/my-posts"
      view={searchParams?.view}
    />
  );
};
