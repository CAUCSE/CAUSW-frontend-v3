import type {
  EnrollmentStatus,
  StepCardData,
} from '../../model/enrollment-verification/types';

/**
 * 상태별 스텝 구성 정적 매핑
 *
 * 각 EnrollmentStatus에 대해 고정된 스텝 카드 배열을 정의합니다.
 * 이 매핑은 비즈니스 로직의 Single Source of Truth 역할을 합니다.
 */
export const ENROLLMENT_STEP_CONFIG: Record<EnrollmentStatus, StepCardData[]> =
  Object.freeze({
    AWAITING_SUBMIT: [
      {
        stepNumber: 1,
        title: '회원가입',
        state: 'completed',
        statusLabel: '완료',
      },
      {
        stepNumber: 2,
        title: '재학정보 제출',
        state: 'active',
        description:
          '서류를 제출하여 중앙대학교 소프트웨어대학에 재적 또는 졸업하였음을 관리자에게 승인을 받아야 해요.',
        highlightText: '중앙대학교 소프트웨어대학',
        buttonLabel: '재학정보 제출하기',
        action: 'submit',
      },
      {
        stepNumber: 3,
        title: '재학정보 심사',
        state: 'locked',
      },
    ],

    PENDING: [
      {
        stepNumber: 1,
        title: '회원가입',
        state: 'completed',
        statusLabel: '완료',
      },
      {
        stepNumber: 2,
        title: '재학정보 제출',
        state: 'completed',
        statusLabel: '완료',
      },
      {
        stepNumber: 3,
        title: '재학정보 심사',
        state: 'active',
        statusLabel: '처리 중',
        description: '관리자 승인까지 최대 2일이 소요될 수 있어요.',
        highlightText: '최대 2일',
        buttonLabel: '재학정보 수정하기',
        action: 'edit',
      },
    ],

    REJECTED: [
      {
        stepNumber: 1,
        title: '회원가입',
        state: 'completed',
        statusLabel: '완료',
      },
      {
        stepNumber: 2,
        title: '재학정보 제출',
        state: 'completed',
        statusLabel: '완료',
      },
      {
        stepNumber: 3,
        title: '재학정보 심사',
        state: 'active',
        statusLabel: '반려됨',
        description: '아래 사유로 반려되었어요.\n',
        buttonLabel: '다시 제출하기',
        action: 'resubmit',
      },
    ],
  } as const);
