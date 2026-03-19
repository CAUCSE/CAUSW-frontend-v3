import type { LockerMyResponse } from '@/entities/locker';

import { formatDateTime } from '../model';

export const LockerInfoCard = ({
  assignment,
}: {
  assignment: LockerMyResponse;
}) => {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">현재 사물함</p>
        <p className="font-bold text-gray-700">
          {assignment.displayName ?? '없음'}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between text-base tracking-[-0.02rem]">
        <p className="font-medium text-gray-500">만료 일시</p>
        <p className="font-bold text-gray-700">
          {formatDateTime(assignment.expiredAt)}
        </p>
      </div>
    </div>
  );
};
