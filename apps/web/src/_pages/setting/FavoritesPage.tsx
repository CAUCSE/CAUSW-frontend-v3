import { RoutedMyActivityWidget } from '@/widgets/setting';

type SearchParams = {
  view?: string;
};

export const FavoritesPage = ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  return (
    <RoutedMyActivityWidget
      pathname="/setting/favorites"
      view={searchParams?.view}
    />
  );
};
