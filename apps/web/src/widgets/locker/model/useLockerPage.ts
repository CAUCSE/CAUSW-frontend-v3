'use client';

import { useState } from 'react';

import { useLockerControl } from '@/features/locker-control';

import type { LockerLocationSummary } from '@/entities/locker';
import {
  useLockerLocationDetail,
  useLockerLocations,
  useLockerPeriodStatus,
  useMyLocker,
} from '@/entities/locker';

import { getLockerViewStatus } from './lib';
import type { ActiveFloor, LockerGridItem } from './types';

export const useLockerPage = () => {
  const [activeFloor, setActiveFloor] = useState<ActiveFloor | null>(null);
  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

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
    onCompleted: () => {
      setIsSelectionOpen(false);
      setSelectedLockerId(null);
    },
  });

  const handleOpenFloor = (floor: LockerLocationSummary) => {
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

  return {
    activeFloor,
    activeFloorAvailableCount:
      activeFloorSummary?.availableCount ??
      activeFloorDetail?.summary.availableCount ??
      activeFloorLockers.filter(
        (locker) =>
          locker.viewStatus === 'available' || locker.viewStatus === 'mine',
      ).length,
    activeFloorError: lockerLocationDetailQuery.error,
    activeFloorLockers,
    activeFloorTotalCount:
      activeFloorSummary?.totalCount ??
      activeFloorDetail?.summary.totalCount ??
      activeFloorLockers.length,
    canApply: activeFloorDetail?.currentPolicy.canApply ?? false,
    canExtend: activeFloorDetail?.currentPolicy.canExtend ?? false,
    currentLocker,
    dismissToast: lockerControl.dismissToast,
    handleApply: lockerControl.handleApply,
    handleExtend: lockerControl.handleExtend,
    handleOpenFloor,
    handleReturn: lockerControl.handleReturn,
    handleSelectionOpenChange,
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
    toasts: lockerControl.toasts,
  };
};
