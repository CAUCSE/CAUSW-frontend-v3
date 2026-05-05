import { Grid, Skeleton } from '@causw/cds';

export const AlumniContactsListLoadingView = () => {
  return (
    <Grid as="ul" className="grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton height={96} className="w-full" key={index} />
      ))}
    </Grid>
  );
};
