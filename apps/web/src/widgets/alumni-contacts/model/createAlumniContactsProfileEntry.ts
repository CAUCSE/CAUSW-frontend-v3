export const createAlumniContactsProfileEntry = ({
  id,
  entry,
  isCurrent,
  startDate,
  endDate,
}: {
  id?: string;
  entry: string;
  isCurrent: boolean;
  startDate: Date;
  endDate?: Date;
}) => ({
  id,
  description: entry,
  startYear: startDate.getFullYear(),
  startMonth: startDate.getMonth() + 1,
  endYear: isCurrent ? null : (endDate?.getFullYear() ?? null),
  endMonth: isCurrent ? null : endDate ? endDate.getMonth() + 1 : null,
});
