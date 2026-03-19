'use client';

import { useState } from 'react';

import type { LockerLocationSummary } from '@/entities/locker';
import {
  useExtendLockerMutation,
  useLockerLocationDetail,
  useLockerLocations,
  useLockerPeriodStatus,
  useMyLocker,
  useRegisterLockerMutation,
  useReturnLockerMutation,
} from '@/entities/locker';

import { extractErrorMessage } from '@/shared/utils';

import { getLockerViewStatus } from './lib';
import type { ActiveFloor, LockerGridItem } from './types';
import { useLockerToast } from './useLockerToast';

export const useLockerListPage = () => {
  const [activeFloor, setActiveFloor] = useState<ActiveFloor | null>(null);
  const [userSelectedLockerId, setUserSelectedLockerId] = useState<
    string | null
  >(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

  const lockerToast = useLockerToast();

  const periodStatusQuery = useLockerPeriodStatus();
  const myLockerQuery = useMyLocker();
  const lockerLocationsQuery = useLockerLocations();
  const lockerLocationDetailQuery = useLockerLocationDetail(
    activeFloor?.locationId ?? null,
  );

  const registerLockerMutation = useRegisterLockerMutation();
  const returnLockerMutation = useReturnLockerMutation();
  const extendLockerMutation = useExtendLockerMutation();

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
  const selectedLockerId =
    userSelectedLockerId ?? currentLockerInActiveFloor?.lockerId ?? null;
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
  const activeFloorAvailableCount =
    activeFloorSummary?.availableCount ??
    activeFloorDetail?.summary.availableCount ??
    activeFloorLockers.filter(
      (locker) =>
        locker.viewStatus === 'available' || locker.viewStatus === 'mine',
    ).length;
  const activeFloorTotalCount =
    activeFloorSummary?.totalCount ??
    activeFloorDetail?.summary.totalCount ??
    activeFloorLockers.length;
  const canApply = activeFloorDetail?.currentPolicy.canApply ?? false;
  const canExtend = activeFloorDetail?.currentPolicy.canExtend ?? false;
  const isPending =
    registerLockerMutation.isPending ||
    returnLockerMutation.isPending ||
    extendLockerMutation.isPending;
  const initialError =
    periodStatusQuery.error ??
    myLockerQuery.error ??
    lockerLocationsQuery.error;
  const activeFloorError = lockerLocationDetailQuery.error;

  const handleOpenFloor = (floor: LockerLocationSummary) => {
    setActiveFloor({
      locationId: floor.locationId,
      floorName: floor.floorName,
    });
    setUserSelectedLockerId(null);
    setIsSelectionOpen(true);
  };

  const handleSelectionOpenChange = (open: boolean) => {
    setIsSelectionOpen(open);

    if (!open) {
      setUserSelectedLockerId(null);
    }
  };

  const handleApply = async () => {
    if (!selectedLockerId) {
      lockerToast.showToast('신청할 사물함을 선택해 주세요.', 'error');
      return;
    }

    const loadingToastId = lockerToast.showToast(
      '사물함 등록 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await registerLockerMutation.mutateAsync(selectedLockerId);
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast('사물함 등록이 완료되었습니다.', 'success');
      handleSelectionOpenChange(false);
    } catch (error) {
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast(
        extractErrorMessage(error, '사물함 등록에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleReturn = async () => {
    if (!currentLocker?.lockerId) return;

    const loadingToastId = lockerToast.showToast(
      '사물함 반납 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await returnLockerMutation.mutateAsync(currentLocker.lockerId);
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast('사물함 반납이 완료되었습니다.', 'success');
      handleSelectionOpenChange(false);
    } catch (error) {
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast(
        extractErrorMessage(error, '사물함 반납에 실패했습니다.'),
        'error',
      );
    }
  };

  const handleExtend = async () => {
    if (!currentLocker?.lockerId) return;

    const loadingToastId = lockerToast.showToast(
      '사물함 연장 중이에요.',
      'loading',
      Infinity,
    );

    try {
      await extendLockerMutation.mutateAsync(currentLocker.lockerId);
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast('사물함 연장이 완료되었습니다.', 'success');
      handleSelectionOpenChange(false);
    } catch (error) {
      lockerToast.dismissToast(loadingToastId);
      lockerToast.showToast(
        extractErrorMessage(error, '사물함 연장에 실패했습니다.'),
        'error',
      );
    }
  };

  return {
    activeFloor,
    currentLocker,
    locationList,
    selectedLockerId,
    activeFloorLockers,
    activeFloorAvailableCount,
    activeFloorTotalCount,
    canApply,
    canExtend,
    isPending,
    isSelectionOpen,
    initialError,
    activeFloorError,
    periodStatusQuery,
    myLockerQuery,
    lockerLocationsQuery,
    lockerLocationDetailQuery,
    lockerToasts: lockerToast.toasts,
    dismissLockerToast: lockerToast.dismissToast,
    handleSelectionOpenChange,
    handleOpenFloor,
    handleApply,
    handleReturn,
    handleExtend,
    setUserSelectedLockerId,
  };
};
