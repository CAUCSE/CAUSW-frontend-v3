import { ENROLLMENT_STEP_CONFIG } from '../config/constants';
import type {
  EnrollmentStatus,
  StepCardData,
} from '../model/enrollment-verification/types';

/**
 * EnrollmentStatus(서버 상태) → StepCardData[](UI 렌더 데이터) 매핑
 *
 * 각 상태별로 3개의 스텝 카드가 어떻게 표시되어야 하는지를 정의합니다.
 * rejectedReason은 외부에서 주입하므로 여기서는 placeholder를 둡니다.
 */
export const getEnrollmentStepsByStatus = (
  status: EnrollmentStatus,
  rejectedReason?: string,
): StepCardData[] => {
  const stepConfigs = ENROLLMENT_STEP_CONFIG[status];

  return stepConfigs.map((step) => {
    // REJECTED 상태의 3번째 스텝에 반려 사유 주입
    if (step.action === 'resubmit' && rejectedReason) {
      return { ...step, rejectedReason };
    }
    return step;
  });
};
