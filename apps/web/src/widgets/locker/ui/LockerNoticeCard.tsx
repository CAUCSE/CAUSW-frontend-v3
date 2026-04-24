import { Info } from '@causw/cds';

import { formatDateTimeWithMeridiem } from '../model';

export const LockerNoticeCard = ({
  endAt,
  startAt,
}: {
  endAt?: string;
  startAt?: string;
}) => {
  return (
    <section className="flex flex-col gap-[0.625rem]">
      <div className="flex items-center gap-1 px-1">
        <Info className="text-gray-300" size={16} />
        <p className="text-base font-bold tracking-[-0.02rem] text-gray-700">
          사물함 신청 기간 안내
        </p>
      </div>
      <div className="rounded-lg bg-white p-5">
        <div className="flex items-center justify-between gap-4 text-base tracking-[-0.02rem]">
          <p className="font-bold text-gray-700">
            {formatDateTimeWithMeridiem(startAt)}
          </p>
          <p className="shrink-0 font-medium text-gray-500">부터</p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-base tracking-[-0.02rem]">
          <p className="font-bold text-gray-700">
            {formatDateTimeWithMeridiem(endAt)}
          </p>
          <p className="shrink-0 font-medium text-gray-500">까지</p>
        </div>
      </div>
    </section>
  );
};
