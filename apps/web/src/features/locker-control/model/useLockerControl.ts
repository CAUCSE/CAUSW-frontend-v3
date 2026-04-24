import {
  useExtendLockerMutation,
  useRegisterLockerMutation,
  useReturnLockerMutation,
} from '@/entities/locker';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

type UseLockerControlParams = {
  currentLockerId: string | null;
  selectedLockerId: string | null;
};

const TOAST_OPTIONS = {
  classNames: {
    viewport: 'pb-16',
  },
} as const;

export const useLockerControl = ({
  currentLockerId,
  selectedLockerId,
}: UseLockerControlParams) => {
  const registerLockerMutation = useRegisterLockerMutation();
  const returnLockerMutation = useReturnLockerMutation();
  const extendLockerMutation = useExtendLockerMutation();

  const handleApply = async () => {
    if (!selectedLockerId) {
      toast.error('신청할 사물함을 선택해 주세요.', TOAST_OPTIONS);
      return;
    }

    try {
      await registerLockerMutation.mutateAsync(selectedLockerId);
      toast.success('사물함 등록이 완료되었습니다.', TOAST_OPTIONS);
    } catch (error) {
      toast.error(
        extractErrorMessage(error, '사물함 등록에 실패했습니다.'),
        TOAST_OPTIONS,
      );
    }
  };

  const handleReturn = async () => {
    if (!currentLockerId) return;

    try {
      await returnLockerMutation.mutateAsync(currentLockerId);
      toast.success('사물함 반납이 완료되었습니다.', TOAST_OPTIONS);
    } catch (error) {
      toast.error(
        extractErrorMessage(error, '사물함 반납에 실패했습니다.'),
        TOAST_OPTIONS,
      );
    }
  };

  const handleExtend = async () => {
    if (!currentLockerId) return;

    try {
      await extendLockerMutation.mutateAsync(currentLockerId);
      toast.success('사물함 연장이 완료되었습니다.', TOAST_OPTIONS);
    } catch (error) {
      toast.error(
        extractErrorMessage(error, '사물함 연장에 실패했습니다.'),
        TOAST_OPTIONS,
      );
    }
  };

  return {
    handleApply,
    handleExtend,
    handleReturn,
    isPending:
      registerLockerMutation.isPending ||
      returnLockerMutation.isPending ||
      extendLockerMutation.isPending,
  };
};
