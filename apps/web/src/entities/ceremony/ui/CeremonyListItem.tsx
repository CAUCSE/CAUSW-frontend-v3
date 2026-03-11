import { ChevronRight } from '@causw/cds';

import { getCeremonyIcon } from '../config';
import type { CeremonyItem } from '../model';

interface CeremonyListItemProps {
  item: CeremonyItem;
  onClick?: () => void;
}

const ALL_DAY_TIMES = ['00:00:00', '23:59:00', '00:00', '23:59'];
const isAllDay = (time: string | null) =>
  time === null || ALL_DAY_TIMES.includes(time);

const formatD = (date: string) => {
  const [, month, day] = date.split('-');
  return `${Number(month)}/${Number(day)}`;
};

const formatDateRange = (
  startDate: string,
  endDate: string,
  startTime: string | null,
  endTime: string | null,
): string => {
  const sameDay = startDate === endDate;
  const hasTime = !isAllDay(startTime) || !isAllDay(endTime);

  if (sameDay && hasTime && startTime) {
    return `${formatD(startDate)} ${startTime.slice(0, 5)}`;
  }

  if (sameDay) {
    return formatD(startDate);
  }

  return `${formatD(startDate)} - ${formatD(endDate)}`;
};

export const CeremonyListItem = ({ item, onClick }: CeremonyListItemProps) => {
  const { title, category, type, startDate, endDate, startTime, endTime } =
    item;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-5 rounded-xl bg-white p-4"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        {getCeremonyIcon(category)}
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <span className="typo-subtitle-16-bold w-full truncate text-left text-gray-700">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span className="typo-body-14-regular text-gray-400">
            {formatDateRange(startDate, endDate, startTime, endTime)}
          </span>
          <span className="h-2 w-px bg-gray-200" />
          <span className="typo-body-14-regular text-gray-400">{type}</span>
        </div>
      </div>

      <ChevronRight size={14} className="shrink-0 fill-gray-300" />
    </button>
  );
};
