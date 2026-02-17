import { RoutedMyActivityWidget } from '@/widgets/setting';

type SearchParams = {
  view?: string;
};

export const MyCommentsPage = ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  return (
    <RoutedMyActivityWidget
      pathname="/setting/my-comments"
      view={searchParams?.view}
    />
  );
};
