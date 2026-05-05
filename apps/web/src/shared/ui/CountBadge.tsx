import { Box } from '@causw/cds';

type Props = {
  count?: number | string;
};

export function CountBadge({ count }: Props) {
  return (
    <Box className="ml-auto flex h-6 w-6 items-center justify-center rounded-sm bg-red-100 text-xs text-red-400">
      {count}
    </Box>
  );
}
