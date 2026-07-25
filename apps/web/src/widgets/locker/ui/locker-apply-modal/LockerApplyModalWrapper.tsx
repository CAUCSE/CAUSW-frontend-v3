import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/shared/ui';

import { LockerApplyModal } from './LockerApplyModal';
import { LockerApplyModalErrorFallback } from './LockerApplyModalErrorFallback';

interface LockerApplyModalWrapperProps {
  locationId: string;
}

export const LockerApplyModalWrapper = ({
  locationId,
}: LockerApplyModalWrapperProps) => {
  return (
    <QueryErrorBoundary
      resetKeys={[locationId]}
      FallbackComponent={LockerApplyModalErrorFallback}
    >
      {/* 데이터가 준비된 후 완성된 모달을 노출하기 위해 별도 Loading Fallback 컴포넌트는 사용하지 않았음 */}
      <Suspense fallback={null}>
        <LockerApplyModal locationId={locationId} />
      </Suspense>
    </QueryErrorBoundary>
  );
};
