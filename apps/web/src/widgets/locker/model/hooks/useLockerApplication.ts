'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';

import { lockerMutationOptions } from '@/features/locker';

import { lockerQueryOptions } from '@/entities/locker';

interface UseLockerApplicationProps {
  locationId: string;
}

export const useLockerApplication = ({
  locationId,
}: UseLockerApplicationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);

  const [{ data: lockerLocation }, { data: myLocker }] = useSuspenseQueries({
    queries: [
      {
        ...lockerQueryOptions.lockerLocation({ locationId }),
      },
      {
        ...lockerQueryOptions.myLocker(),
      },
    ],
  });

  const resetSelectedLockerId = () => {
    setSelectedLockerId(null);
  };

  const { mutate: registerLocker } = useMutation({
    ...lockerMutationOptions.lockerRegistration({ queryClient }),
  });

  const { mutate: returnLocker } = useMutation({
    ...lockerMutationOptions.lockerReturn({ queryClient }),
  });

  const { mutate: extendLocker } = useMutation({
    ...lockerMutationOptions.lockerExtension({ queryClient }),
  });

  const selectLocker = (lockerId: string) => {
    setSelectedLockerId((prev) => (prev === lockerId ? null : lockerId));
  };

  const apply = () => {
    if (!selectedLockerId) return;
    registerLocker(
      { lockerId: selectedLockerId },
      {
        onSuccess: resetSelectedLockerId,
      },
    );
  };

  const returnMyLocker = () => {
    if (!myLocker.lockerId) return;
    returnLocker(
      { lockerId: myLocker.lockerId },
      {
        onSuccess: resetSelectedLockerId,
      },
    );
  };

  const extendMyLocker = () => {
    if (!myLocker.lockerId) return;
    extendLocker(
      { lockerId: myLocker.lockerId },
      {
        onSuccess: resetSelectedLockerId,
      },
    );
  };

  return {
    lockerLocation,
    myLocker,
    selectedLockerId,
    selectLocker,
    apply,
    returnMyLocker,
    extendMyLocker,
    close: () => router.back(),
  };
};
