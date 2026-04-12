interface AlumniContactsPeriod {
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
}

export const formatAlumniContactsPeriod = ({
  startYear,
  startMonth,
  endYear,
  endMonth,
}: AlumniContactsPeriod) => {
  const endPeriod =
    endYear !== null && endMonth !== null
      ? `${endYear}년 ${endMonth}월`
      : '현재';

  return `${startYear}년 ${startMonth}월 - ${endPeriod}`;
};
