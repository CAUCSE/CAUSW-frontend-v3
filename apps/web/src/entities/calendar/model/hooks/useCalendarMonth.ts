import { useMemo, useState } from 'react';

export function useCalendarMonth(initialDate = new Date()) {
  const [viewMonth, setViewMonth] = useState(initialDate);

  const scheduleApiParams = useMemo(() => {
    const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const lastDay = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    );
    return { from: firstDay, to: lastDay };
  }, [viewMonth]);

  return {
    viewMonth,
    setViewMonth,
    scheduleApiParams,
    currentMonth: viewMonth.getMonth() + 1,
  };
}
