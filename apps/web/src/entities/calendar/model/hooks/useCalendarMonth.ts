import { useMemo, useState } from 'react';

export function useCalendarMonth({
  initialDate = new Date(),
  includeAdjacentDays = false,
} = {}) {
  const [viewMonth, setViewMonth] = useState(initialDate);

  const scheduleApiParams = useMemo(() => {
    const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const lastDay = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    );
    if (includeAdjacentDays) {
      firstDay.setDate(1 - firstDay.getDay());
      lastDay.setDate(lastDay.getDate() + 6 - lastDay.getDay());
    }

    return { from: firstDay, to: lastDay };
  }, [includeAdjacentDays, viewMonth]);

  return {
    viewMonth,
    setViewMonth,
    scheduleApiParams,
  };
}
