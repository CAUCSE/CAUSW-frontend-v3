import { Info } from '@causw/cds';

import type { LockerPhase } from '@/entities/locker';

import { getPeriodLabel, PHASE_LABEL } from '../model';

export const LockerNoticeCard = ({
  endAt,
  phase,
  startAt,
}: {
  endAt?: string;
  phase?: LockerPhase;
  startAt?: string;
}) => {
  return (
    <section className="flex flex-col gap-[0.625rem]">
      <div className="flex items-center gap-1 px-1">
        <Info className="text-gray-300" size={16} />
        <p className="text-base font-bold tracking-[-0.02rem] text-gray-700">
          사물함 기간 안내
        </p>
      </div>
      <div className="rounded-lg bg-white p-5">
        <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
          <p className="font-medium text-gray-500">현재 상태</p>
          <p className="font-bold text-gray-700">
            {phase ? PHASE_LABEL[phase] : '불러오는 중'}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-base tracking-[-0.02rem]">
          <p className="font-medium text-gray-500">적용 기간</p>
          <p className="text-right font-bold text-gray-700">
            {getPeriodLabel(startAt, endAt)}
          </p>
        </div>
      </div>
    </section>
  );
};
