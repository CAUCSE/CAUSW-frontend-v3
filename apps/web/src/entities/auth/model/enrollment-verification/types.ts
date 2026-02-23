/**
 * 재학인증 관련 비즈니스 타입 정의
 */

/**
 * 서버에서 내려오는 재학인증 상태값
 *
 * - `AWAITING_SUBMIT`: 재학정보 제출 대기 (회원가입 완료, 서류 미제출)
 * - `PENDING`: 관리자 심사 처리 중
 * - `REJECTED`: 관리자 심사 반려됨
 * - `COMPLETED`: 재학인증 완료
 */
export type EnrollmentStatus =
  | 'AWAITING_SUBMIT'
  | 'PENDING'
  | 'REJECTED'
  | 'COMPLETED';

/**
 * 개별 스텝의 시각적 상태
 *
 * - `completed`: 완료된 스텝 (체크 아이콘 + "완료" 텍스트)
 * - `active`: 현재 활성화된 스텝 (파란색 보더 + 안내 텍스트 + 액션 버튼)
 * - `locked`: 아직 도달하지 않은 잠긴 스텝 (비활성 표시)
 */
export type StepState = 'completed' | 'active' | 'locked';

/**
 * 스텝 카드에 표시할 데이터
 */
export interface StepCardData {
  /** 스텝 번호 (1, 2, 3) */
  stepNumber: number;
  /** 스텝 제목 */
  title: string;
  /** 스텝의 시각적 상태 */
  state: StepState;
  /** 우측 상태 라벨 (예: "처리 중", "반려됨") */
  statusLabel?: string;
  /** 설명 텍스트 */
  description?: string;
  /** 설명 내 하이라이트할 텍스트 (파란색으로 표시) */
  highlightText?: string;
  /** 반려 사유 (빨간색으로 표시) */
  rejectedReason?: string;
  /** 액션 버튼 라벨 */
  buttonLabel?: string;
  /** 액션 버튼 클릭 핸들러 키 */
  action?: EnrollmentAction;
}

/**
 * 가능한 액션 타입
 */
export type EnrollmentAction = 'submit' | 'edit' | 'resubmit';
