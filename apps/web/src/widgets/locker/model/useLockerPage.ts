'use client';

import { useEffect, useState } from 'react';

import { useLockerControl } from '@/features/locker';

import type { LockerLocationSummary } from '@/entities/locker';
import {
  useLockerLocationDetail,
  useLockerLocations,
  useLockerPeriodStatus,
  useMyLocker,
} from '@/entities/locker';

import { getLockerViewStatus } from './lockerStatus';
import type { ActiveFloor, LockerGridItem } from './types';

const LAST_LOCKER_ASSIGNMENT_STORAGE_KEY = 'locker:last-assignment';

export const useLockerPage = () => {
  const [activeFloor, setActiveFloor] = useState<ActiveFloor | null>(null);
  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [autoReturnedNoticeKey, setAutoReturnedNoticeKey] = useState<
    string | null
  >(null);

  const periodStatusQuery = useLockerPeriodStatus();
  const myLockerQuery = useMyLocker();
  const lockerLocationsQuery = useLockerLocations();
  const lockerLocationDetailQuery = useLockerLocationDetail(
    activeFloor?.locationId ?? null,
  );

  const currentLocker = myLockerQuery.data?.hasLocker
    ? myLockerQuery.data
    : null;
  const locationList = lockerLocationsQuery.data?.floors ?? [];
  const activeFloorSummary =
    locationList.find(
      (floor) => floor.locationId === activeFloor?.locationId,
    ) ?? null;
  const activeFloorDetail = lockerLocationDetailQuery.data;
  const currentLockerInActiveFloor =
    activeFloorDetail?.lockers.find(
      (locker) => locker.lockerId === currentLocker?.lockerId,
    ) ?? null;
  const resolvedSelectedLockerId =
    selectedLockerId ?? currentLockerInActiveFloor?.lockerId ?? null;
  const activeFloorLockers: LockerGridItem[] = (
    activeFloorDetail?.lockers ?? []
  )
    .slice()
    .sort((left, right) => Number(left.number) - Number(right.number))
    .map((locker) => ({
      ...locker,
      lockerNumber: Number(locker.number),
      viewStatus: getLockerViewStatus(locker, currentLocker?.lockerId ?? null),
    }));

  const lockerControl = useLockerControl({
    currentLockerId: currentLocker?.lockerId ?? null,
    selectedLockerId: resolvedSelectedLockerId,
  });

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      myLockerQuery.isLoading ||
      !currentLocker?.lockerId ||
      !currentLocker.expiredAt
    ) {
      return;
    }

    window.localStorage.setItem(
      LAST_LOCKER_ASSIGNMENT_STORAGE_KEY,
      JSON.stringify({
        expiredAt: currentLocker.expiredAt,
        lockerId: currentLocker.lockerId,
      }),
    );
  }, [
    currentLocker?.expiredAt,
    currentLocker?.lockerId,
    myLockerQuery.isLoading,
  ]);

  const handleOpenFloor = (floor: LockerLocationSummary) => {
    if (typeof window !== 'undefined' && !currentLocker) {
      const lastAssignment = window.localStorage.getItem(
        LAST_LOCKER_ASSIGNMENT_STORAGE_KEY,
      );

      if (lastAssignment) {
        try {
          const parsed = JSON.parse(lastAssignment) as {
            expiredAt?: string;
          };

          if (parsed.expiredAt) {
            const expiredAt = new Date(parsed.expiredAt);

            if (
              !Number.isNaN(expiredAt.getTime()) &&
              expiredAt.getTime() <= Date.now()
            ) {
              setAutoReturnedNoticeKey(parsed.expiredAt);
            }
          }
        } catch {
          window.localStorage.removeItem(LAST_LOCKER_ASSIGNMENT_STORAGE_KEY);
        }
      }
    }

    setActiveFloor({
      locationId: floor.locationId,
      floorName: floor.floorName,
    });
    setSelectedLockerId(null);
    setIsSelectionOpen(true);
  };

  const handleSelectionOpenChange = (open: boolean) => {
    setIsSelectionOpen(open);

    if (!open) {
      setSelectedLockerId(null);
    }
  };

  const handleAutoReturnedNoticeClose = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LAST_LOCKER_ASSIGNMENT_STORAGE_KEY);
    }

    setAutoReturnedNoticeKey(null);
  };

  return {
    activeFloor,
    activeFloorAvailableCount:
      activeFloorSummary?.availableCount ??
      activeFloorDetail?.summary.availableCount ??
      activeFloorLockers.filter((locker) => locker.viewStatus === 'available')
        .length,
    activeFloorError: lockerLocationDetailQuery.error,
    activeFloorLockers,
    activeFloorTotalCount:
      activeFloorSummary?.totalCount ??
      activeFloorDetail?.summary.totalCount ??
      activeFloorLockers.length,
    canApply: activeFloorDetail?.currentPolicy.canApply ?? false,
    canExtend: activeFloorDetail?.currentPolicy.canExtend ?? false,
    currentLocker,
    handleApply: lockerControl.handleApply,
    handleAutoReturnedNoticeClose,
    handleExtend: lockerControl.handleExtend,
    handleOpenFloor,
    handleReturn: lockerControl.handleReturn,
    handleSelectionOpenChange,
    hasAutoReturnedNotice: autoReturnedNoticeKey !== null,
    initialError:
      periodStatusQuery.error ??
      myLockerQuery.error ??
      lockerLocationsQuery.error,
    isPending: lockerControl.isPending,
    isSelectionOpen,
    locationList,
    lockerLocationDetailQuery,
    lockerLocationsQuery,
    myLockerQuery,
    periodStatusQuery,
    selectedLockerId: resolvedSelectedLockerId,
    setSelectedLockerId,
  };
};
