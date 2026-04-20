export const createAlumniContactsProfileEntry = ({
  entry,
  isCurrent,
  startDate,
  endDate,
}: {
  entry: string;
  isCurrent: boolean;
  startDate: Date;
  endDate?: Date;
}) => ({
  description: entry,
  startYear: startDate.getFullYear(),
  startMonth: startDate.getMonth() + 1,
  endYear: isCurrent ? null : (endDate?.getFullYear() ?? null),
  endMonth: isCurrent ? null : endDate ? endDate.getMonth() + 1 : null,
});
