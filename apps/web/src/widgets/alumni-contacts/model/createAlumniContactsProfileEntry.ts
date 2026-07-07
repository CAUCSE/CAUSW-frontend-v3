export const createAlumniContactsProfileEntry = ({
  id,
  entry,
  isCurrent,
  startYear,
  startMonth,
  endYear,
  endMonth,
}: {
  id?: string;
  entry: string;
  isCurrent: boolean;
  startYear: number;
  startMonth: number;
  endYear?: number | null;
  endMonth?: number | null;
}) => ({
  id,
  description: entry,
  startYear,
  startMonth,
  endYear: isCurrent ? null : (endYear ?? null),
  endMonth: isCurrent ? null : (endMonth ?? null),
});
