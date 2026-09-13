import { Grid, Skeleton } from '@causw/cds';

const ALUMNI_CONTACTS_LIST_SKELETON_ITEM_COUNT = 10;

export const AlumniContactsListLoadingView = () => {
  return (
    <Grid as="ul" className="grid-cols-1 gap-4 pt-4 md:grid-cols-2">
      {Array.from({ length: ALUMNI_CONTACTS_LIST_SKELETON_ITEM_COUNT }).map(
        (_, index) => (
          <Skeleton height={96} className="w-full" key={index} />
        ),
      )}
    </Grid>
  );
};
